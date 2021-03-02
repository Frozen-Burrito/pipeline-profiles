import pandas as pd
from util import execute_sql, normalize_dates, most_common
import os
import json
script_dir = os.path.dirname(__file__)


def get_data(sql=False):
    if sql:
        df = execute_sql(path=script_dir, query_name='o_and_m.sql', db='dsql23cap')
        df.to_csv('raw_data/o_and_m.csv', index=False)
    else:
        df = pd.read_csv('raw_data/o_and_m.csv')
    return df


def meta_activities(df_c, company, meta):
    meta = most_common(df_c, meta, "Activity Type", "mostCommonActivity", top=3)
    # meta = most_common(df_c, meta, "Nearest Populated Centre", "nearby", top=3)
    meta["numberOfEvents"] = int(df_c['Event Number'].count())
    meta["numberOfDigs"] = int(df_c['Dig Count'].sum())
    meta["earliestYear"] = min(df_c['Occurrence Date']).year
    meta["latestYear"] = max(df_c['Occurrence Date']).year
    meta["speciesAtRiskEvents"] = int(df_c[df_c['Species At Risk Present'] == "True"].sum()['Species At Risk Present'])
    meta["companyName"] = company
    return meta


def process_operations():
    if not os.path.exists("../o_and_m"):
        os.mkdir("../o_and_m")
        os.mkdir("../o_and_m/company_data")

    df = get_data()
    for delete in ['Description',
                   'Circumstance',
                   'Third Party Consultation',
                   'References To Company Manuals',
                   'Pipeline Name',
                   'Location Description',
                   'Address',
                   'Postal Code',
                   'Rationale',
                   'Acts and Regulations',
                   'Vehicle Crossing Count',
                   'Facility Name',
                   'City',
                   'Using Navigable Waters',
                   'Meeting Transport Canada Minor Work and Water Order',
                   'Water Frozen Or Dry',
                   'Following DFO Fish Measures',
                   'Shore Option']:

        del df[delete]

    # standardize the activity types
    activity_cols = ['Activity Type', 'Activity Type Other']
    for activity in activity_cols:
        df[activity] = [str(x).strip().lower().capitalize() for x in df[activity]]
        df[activity] = df[activity].replace("", "Other")
    consolidated_activity = []
    for a1, a2 in zip(df['Activity Type'], df['Activity Type Other']):
        if a1 in ["Nan", "Other"] and a2 not in ["Nan", "Other"]:
            consolidated_activity.append(a2)
        elif a1 not in ["Nan", "Other"] and a2 in ["Nan", "Other"]:
            consolidated_activity.append(a1)
        elif a1 == a2:
            consolidated_activity.append(a1)
        else:
            consolidated_activity.append('Error')

    for activity in activity_cols:
        del df[activity]
    df['Activity Type'] = consolidated_activity
    df['Activity Type'] = df['Activity Type'].replace({"Nan": "Other", "Error": "Other"})
    df = normalize_dates(df, ['Occurrence Date', 'Completion Date'], short_date=True)
    df['Year'] = [x.year for x in df['Occurrence Date']]

    for fillZero in ['Dig Count']:
        df[fillZero] = df[fillZero].fillna(0)
    for fillFalse in ['Integrity Dig',
                      'Ground Disturbance Near Water Required',
                      'Fish Present',
                      'In Stream Work Required',
                      'Species At Risk Present']:

        df[fillFalse] = df[fillFalse].fillna("False")
    company_files = ['NOVA Gas Transmission Ltd.']

    for company in company_files:
        meta = {}
        thisCompanyData = {}
        folder_name = company.replace(' ', '').replace('.', '')
        df_c = df[df['Company Name'] == company].copy().reset_index(drop=True)
        if not df_c.empty:
            thisCompanyData['meta'] = meta_activities(df_c, company, meta)
            thisCompanyData['events'] = df_c.to_dict(orient='records')
            delete_after_meta = ['Event Number',
                                 'Completion Date',
                                 'Occurrence Date',
                                 'Nearest Populated Centre',
                                 'Company Name']

            for col in delete_after_meta:
                del df_c[col]
            with open('../o_and_m/company_data/'+folder_name+'.json', 'w') as fp:
                json.dump(thisCompanyData, fp, default=str)

    return df_c, meta, df
    # return df


if __name__ == "__main__":
    print('starting o and m...')
    df_c, meta, df = process_operations()
    print('completed o and m!')