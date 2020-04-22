import pandas as pd
import sqlite3
import argparse
import sys

parser = argparse.ArgumentParser()
parser.add_argument("--dbfile", required=True)
parser.add_argument("--csv", required=True)

try:
    args = parser.parse_args()
except:
    parser.print_help()
    sys.exit(2)

csvfile = args.csv
dbfile = args.dbfile

db = sqlite3.connect(dbfile)
try:
    tbl = pd.read_csv(csvfile, header=None)
except Exception as e:
    print("Error while reading file {}".format(csvfile))
    print(e)

if tbl.shape[1] == 3:
    sql = """INSERT OR REPLACE INTO results (id, result, timestamp)
    VALUES (?, ?, ?) """
else:
    sql = """INSERT OR REPLACE INTO results (id, result, timestamp)
    VALUES (?, ?, datetime('now','localtime') ) """

for row in tbl.iterrows():
    try:
        db.execute(sql, row[1].tolist())
    except Exception as e:
        print(row[1].tolist(), e)

db.commit()
db.close()
print("OK")
