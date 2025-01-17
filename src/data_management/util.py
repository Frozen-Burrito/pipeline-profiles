from connection import cer_connection
import pandas as pd
import numpy as np
import os
from errors import IdError, IdLengthError
from datetime import date
import io


def get_company_list(commodity="all"):
    company_list = [['NOVA Gas Transmission Ltd.', 'gas'],
                    ['TransCanada PipeLines Limited', 'gas'],
                    ['Enbridge Pipelines Inc.', 'oil'],
                    ['Enbridge Pipelines (NW) Inc.', 'oil'],
                    ['Enbridge Bakken Pipeline Company Inc.', 'oil'],
                    ['Express Pipeline Ltd.', 'oil'],
                    ['Trans Mountain Pipeline ULC', 'oil'],
                    ['Trans Quebec and Maritimes Pipeline Inc.', 'gas'],
                    ['Trans-Northern Pipelines Inc.', 'oil'],
                    ['TransCanada Keystone Pipeline GP Ltd.', 'oil'],
                    ['Westcoast Energy Inc.', 'gas'],
                    ['Alliance Pipeline Ltd.', 'gas'],
                    ['PKM Cochin ULC', 'oil'],
                    ['Foothills Pipe Lines Ltd.', 'gas'],
                    ['Southern Lights Pipeline', 'oil'],
                    ['Emera Brunswick Pipeline Company Ltd.', 'gas'],
                    ['Plains Midstream Canada ULC', 'oil'],
                    ['Genesis Pipeline Canada Ltd.', 'gas'],
                    ['Montreal Pipe Line Limited', 'oil'],
                    ['Kingston Midstream Westspur Limited', 'oil'],
                    ['Many Islands Pipe Lines (Canada) Limited', 'gas'],
                    ['Vector Pipeline Limited Partnership', 'gas'],
                    ['Maritimes & Northeast Pipeline Management Ltd.', 'gas'],
                    ['Aurora Pipeline Company Ltd', 'oil']]

    if commodity == "all":
        return [x[0] for x in company_list]
    elif commodity == "gas" or commodity == "oil":
        return [x[0] for x in company_list if x[1] == commodity]
    else:
        return []


def company_rename():
    names = {'Westcoast Energy Inc., carrying on business as Spectra Energy Transmission': 'Westcoast Energy Inc.',
             'Kingston Midstream Limited': 'Kingston Midstream Westspur Limited',
             'Trans Québec and Maritimes Pipeline Inc.': 'Trans Quebec and Maritimes Pipeline Inc.',
             'Enbridge Southern Lights GP Inc. on behalf of Enbridge Southern Lights LP': 'Southern Lights Pipeline',
             'Enbridge Southern Lights GP Inc.': 'Southern Lights Pipeline',
             'Alliance Pipeline Ltd as General Partner of Alliance Pipeline Limited Partnership': 'Alliance Pipeline Ltd.',
             'Trans Mountain Pipeline Inc.': 'Trans Mountain Pipeline ULC',
             'Kinder Morgan Cochin ULC': 'PKM Cochin ULC',
             'Enbridge Bakken Pipeline Company Inc., on behalf of Enbridge Bakken Pipeline Limited Partnership': 'Enbridge Bakken Pipeline Company Inc.',
             'TEML Westspur Pipelines Limited': 'Kingston Midstream Westspur Limited',
             'Plains Marketing Canada, L.P.': 'Plains Midstream Canada ULC'}
    return names


def execute_sql(path, query_name, db='tsql23cap'):
    query_path = os.path.join(path, query_name)
    conn, engine = cer_connection(db=db)

    def utf16open(query_path):
        file = io.open(query_path, mode='r', encoding="utf-16", errors='ignore')
        query = file.read()
        file.close()
        return query

    def no_encoding_open(query_path):
        file = io.open(query_path, mode='r', errors='ignore')
        query = file.read()
        file.close()
        return query

    try:
        query = utf16open(query_path)
    except:
        query = no_encoding_open(query_path)

    df = pd.read_sql_query(query, con=conn)
    conn.close()
    return df


def most_common(df,
                meta,
                col_name,
                meta_key,
                top=1,
                dtype="dict",
                lower=True,
                joinTies=True):

    what_list = []
    for what in df[col_name]:
        what = str(what)
        if ',' in what:
            what_list.extend(what.split(','))
        else:
            what_list.append(what)
    what_list = [x.strip() for x in what_list]
    what_list = [x for x in what_list if x not in ['To be determined', '', "Other", "Not Specified", "Sans objet", "Autre"]]

    dft = pd.DataFrame(what_list, columns=["entries"])
    dft['records'] = 1
    dft = dft.groupby(by="entries").sum().reset_index()
    dft = dft.sort_values(by=['records', 'entries'], ascending=[False, True])
    if joinTies:
        dft = dft.groupby(by="records").agg({"entries": " & ".join}).reset_index()
        dft = dft.sort_values(by=['records'], ascending=False)
    dft = dft.head(top)

    counter = {}
    for name, count in zip(dft['entries'], dft['records']):
        counter[name] = count

    if lower:
        counter = {k.lower(): counter[k] for k in list(counter)}

    if dtype != "dict":
        counter = list(counter.keys())
    if top == 1:
        counter = list(counter.keys())[0]
    meta[meta_key] = counter
    return meta


def normalizeBool(df, cols, normType="Y/N"):
    for col in cols:
        df[col] = [str(x).strip() for x in df[col]]
        if normType == "T/F":
            df[col] = df[col].replace({"True": "T",
                                       "False": "F"})
        elif normType == "Y/N":
            df[col] = df[col].replace({"True": "Yes",
                                       "False": "No"})

    return df


def normalize_dates(df, date_list, short_date=False):
    for date_col in date_list:
        df[date_col] = pd.to_datetime(df[date_col], errors='raise')
        if short_date:
            df[date_col] = df[date_col].dt.date
    return df


def normalize_text(df, text_list):
    for text_col in text_list:
        df[text_col] = df[text_col].astype(object)
        df[text_col] = [str(x).strip() for x in df[text_col]]
    return df


def normalize_numeric(df, num_list, decimals):
    for num_col in num_list:
        df[num_col] = pd.to_numeric(df[num_col], errors='coerce')
        df[num_col] = df[num_col].round(decimals)
    return df


def pipeline_names():
    read_path = os.path.join(os.getcwd(), 'raw_data/','NEB_DM_PROD - 1271412 - Pipeline Naming Conventions.XLSX')
    df = pd.read_excel(read_path, sheet_name='Pipeline Naming Conventions')
    df = df.rename(columns={x: x.strip() for x in df.columns})
    df['old name'] = [x.strip() for x in df['Company List maintained by Tammy Walker https://www.cer-rec.gc.ca/bts/whwr/cmpnsrgltdbnb-eng.html']]
    df['new name'] = [x.strip() for x in df['Suggested Pipeline Name for ALL Future External Publications']]
    return {old_name: new_name for old_name, new_name in zip(df['old name'],
                                                             df['new name'])}


def daysInYear(year):
    d1 = date(year, 1, 1)
    d2 = date(year + 1, 1, 1)
    return (d2 - d1).days


def saveJson(df, write_path, precision=2):
    df.to_json(write_path,
               orient='records',
               double_precision=precision,
               compression='infer')


def get_company_names(col):
    return sorted(list(set(col)))


def conversion(df, commodity, dataCols, rounding=False, fillna=False):
    if commodity == 'gas':
        conv = 28316.85
    elif commodity == "oil":
        conv = 6.2898

    for col in dataCols:
        if fillna:
            df[col] = df[col].fillna(fillna)
        if commodity == "oil":
            df[col] = [x*conv if not pd.isnull(x) else x for x in df[col]]
        else:
            df[col] = [x/conv if not pd.isnull(x) else x for x in df[col]]
        if rounding:
            df[col] = df[col].round(rounding)
    return df


def strip_cols(df):
    newCols = {x: x.strip() for x in df.columns}
    df = df.rename(columns=newCols)
    return df


def idify(df, col, key, lcase=True):

    region = {"alberta": "ab",
              "british columbia": "bc",
              "saskatchewan": "sk",
              "manitoba": "mb",
              "ontario": "on",
              "quebec": "qc",
              "québec": "qc",
              "new brunswick": "nb",
              "nova scotia": "ns",
              "northwest territories": "nt",
              "prince edward island": "pe",
              "nunavut": "nu",
              "yukon": "yt"}

    if key == "region":
        r = region
    else:
        r = key

    if lcase:
        df[col] = [x.lower() for x in df[col]]
    df[col] = df[col].replace(r)

    # check if column has non id's
    # maxColLength = max([len(str(x)) for x in df[col]])
    maxIdLength = max([len(str(x)) for x in r.values()])
    doesntCount = [np.nan, "nan", None, "none"]
    for value in df[col]:
        if value not in r.values() and value not in doesntCount:
            raise IdError(value)
        if len(str(value)) > maxIdLength and value not in doesntCount:
            raise IdLengthError(value)

    return df


def get_data(script_dir, query, db="", sql=False, csv_encoding="utf-8"):
    csvName = query.split(".")[0]+".csv"
    if sql:
        print('reading SQL '+query.split(".")[0])
        df = execute_sql(path=os.path.join(script_dir, "queries"), query_name=query, db=db)
        df.to_csv('raw_data/'+csvName, index=False)
    else:
        print('reading local '+query.split(".")[0])
        df = pd.read_csv('raw_data/'+csvName, encoding=csv_encoding)
    return df


def prepareIds(df):
    idSave = {}
    for key, e, f in zip(df.id, df.e, df.f):
        idSave[key] = {"e": e, "f": f}
    return idSave


if __name__ == "__main__":
    None
