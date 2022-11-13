import json
import os
from glob import glob

from swotfunctions.utils import standardize

fieldsites = glob("jsonOutputs/*.json")

for filename in fieldsites:
    with open(filename, "r") as fp:
        fieldsite = json.load(fp)

    fieldsite_name = fieldsite["name"]
    datapoint_docs = fieldsite["standardizedData"]

    datapoints = []
    for doc in datapoint_docs:
        new_doc = {}
        ts_frc = doc.get("ts_frc", doc.get("ts_frc1", None))
        hh_frc = doc.get("hh_frc", doc.get("hh_frc1", None))
        new_doc["tsDate"] = doc["ts_datetime"]
        new_doc["hhDate"] = doc["hh_datetime"]
        new_doc["tsFrc"] = ts_frc
        new_doc["hhFrc"] = hh_frc
        new_doc["tsCond"] = doc["ts_cond"]
        new_doc["tsTemp"] = doc["ts_wattemp"]
        new_doc["timezoneOffset"] = 0

        datapoints.append(standardize.Datapoint.from_document(new_doc))

    csv_lines = standardize.Datapoint.get_csv_lines(datapoints)
    os.makedirs("csvOutputs", exist_ok=True)
    with open(f"csvOutputs/{fieldsite_name}.csv", "w") as fp:
        for line in csv_lines:
            fp.write(line + "\n")
