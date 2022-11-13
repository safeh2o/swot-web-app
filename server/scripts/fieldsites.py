# for every fieldsite, get all linked datasets, and consolidate the std files into one

import json
import os

import pymongo

MONGO_DB_CONNECTION_STRING = input("Enter MongoDB connection string: ")

current_fieldsites = {}
client = pymongo.MongoClient(MONGO_DB_CONNECTION_STRING)
db = client.get_database()
fieldsites = db.get_collection("fieldsites")
datasets = db.get_collection("datasets")

for fieldsite in fieldsites.find():
    current_fieldsites[fieldsite["_id"]] = {
        "name": fieldsite["name"],
        "standardizedData": [],
    }

for dataset in datasets.find({"fieldsite": {"$in": list(current_fieldsites.keys())}}):
    data = dataset["standardizedData"]
    if not data:
        continue

    fieldsite = current_fieldsites[dataset["fieldsite"]]
    fieldsite["standardizedData"] += data

os.makedirs("jsonOutputs", exist_ok=True)
ser_fieldsites = {}
for k, v in current_fieldsites.items():
    str_id = str(k)
    fieldsite_name = v["name"]
    with open("jsonOutputs/" + fieldsite_name + ".json", "w") as fp:
        json.dump(v, fp)

print("Done")
