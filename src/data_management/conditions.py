import pandas as pd
import json
import os
from util import saveJson,normalize_text
import geopandas as gpd
#%%

script_dir = os.path.dirname(__file__) 

def import_stats_can(name='ler_000b16a_e.shp'):
    read_path = os.path.join(script_dir, 'raw_data/ler_000b16a_e/',name)
    df = gpd.read_file(read_path)
    df = df.set_geometry('geometry')
    print(df.crs)
    return df
    

def import_simplified(name='economic_regions.json'):
    read_path = os.path.join(script_dir,"../conditions/conditions_data/",name)
    df = gpd.read_file(read_path)
    df = df.set_geometry('geometry')
    fr_cols = ['PRNAME','ERNAME']
    for splitcols in fr_cols:    
        df[splitcols] = [x.split('/')[0].strip() for x in df[splitcols]]
    #df = df.rename(columns={'ERNAME':'id'})
    return df

def export_files(df,folder="../conditions/conditions_data/",name="economic_regions.geojson"):
    df = df[~df.geometry.is_empty]
    df = df[df.geometry.notna()]
    write_path = os.path.join(script_dir,folder,name)
    df.to_file(write_path, driver='GeoJSON')
    print('exported: '+name+' to geojson','with CRS: '+str(df.crs))


def conditions_on_map(df,shp,company):
    shp = pd.merge(shp,df,how='inner',left_on=['PRNAME','ERNAME'],right_on=['Flat Province','id'])
    for delete in ['Short Project Name','Flat Province','Themes']:
        del shp[delete]
    export_files(shp,folder="../conditions/conditions_map",name=company.replace('.','')+'.json')
    saveJson(df,os.path.join('../conditions/conditions_map/',company.replace('.','')+'meta'+'.json'))
    return shp

def region_data(df):
    
    return df


def readCsv(link='http://www.cer-rec.gc.ca/open/conditions/conditions.csv'):
    conditions_path = os.path.join(script_dir,'conditions_data/','conditions.csv')
    print('downloading remote file')
    df = pd.read_csv(link,sep='\t',lineterminator='\r',encoding="UTF-16",error_bad_lines=False)
    dates = ['Effective Date','Issuance Date','Sunset Date']
    for date in dates:
        df[date] = pd.to_datetime(df[date])
        
    df = normalize_text(df,['Location','Short Project Name','Theme(s)'])
    delete_cols = ['Project Name','Condition','Condition Phase','Instrument Activity','Condition Type','Condition Filing']
    for delete in delete_cols:
        del df[delete]
    for r in ['\n','"']:    
        df['Company'] = df['Company'].replace(r,'', regex=True)
    
    df = df[df['Short Project Name']!="SAM/COM"]
    #df.to_csv("../conditions/conditions_data/conditions.csv",index=False,encoding="UTF-16")
    
    company_files = ['NOVA Gas Transmission Ltd.']
    regions_map = import_simplified()
    
    for company in company_files:
        write_path = os.path.join('../conditions/conditions_data/',company.replace('.','')+'.json')
        df_c = df[df['Company']==company].copy()
        df_c = df_c[df_c['Condition Status']=="In Progress"]
        df_c['condition id'] = [str(ins)+'_'+str(cond) for ins,cond in zip(df_c['Instrument Number'],df_c['Condition Number'])]
        
        expanded_locations = []
        for unique in df_c['condition id']:
            row = df_c[df_c['condition id']==unique].copy()
            locations =  [x.split(',') for x in row['Location']]
            for region in locations[0]:
                regionProvince = region.strip().split('/')
                row['id'] = regionProvince[0].strip()
                row['Flat Province'] = regionProvince[-1].strip()
                expanded_locations.append(row)
        df_all = pd.concat(expanded_locations,axis=0,sort=False,ignore_index=True)
        df_all = df_all[df_all['Location']!="nan"]
        del df_all['Location']
        #calculate metadata here
        df_meta = region_data(df_all)
        return df_meta
        df_all = df_all.groupby(['Flat Province','id']).agg({'condition id':'count',
                                                             'Short Project Name':lambda x: list(x),
                                                             'Theme(s)':lambda t: list(t)})
        
        for list_field in ['Short Project Name','Theme(s)']:
            joined_values = []
            for list_row in df_all[list_field]:
                if list_field == 'Theme(s)':
                    concat_themes = []
                    for theme in list_row:
                        concat_themes.extend(theme.split(','))
                    list_row = [x.strip() for x in concat_themes]
                joined_values.append(' - '.join(list(set(list_row))))
            df_all[list_field] = joined_values
        
        df_all = df_all.reset_index()
        df_all = df_all.rename(columns={'condition id':'value','Theme(s)':'Themes'})
        
        shp = conditions_on_map(df_all, regions_map,company)
    
    return shp,df_all


def company_names(df):
    company_list = list(set(list(df['Company'])))
    return company_list


if __name__ == "__main__":
    meta = readCsv()
    #shp = import_stats_can()

#%%

