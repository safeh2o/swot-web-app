# for every fieldsite, get all linked datasets, and consolidate the std files into one

import pymongo
import json
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DB_CONNECTION_STRING = os.getenv("MONGO_DB_CONNECTION_STRING")

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

ser_fieldsites = {}
for k, v in current_fieldsites.items():
    str_id = str(k)
    fieldsite_name = v["name"]
    with open("output/" + fieldsite_name + ".json", "w") as fp:
        json.dump(v, fp)

print("Done")
