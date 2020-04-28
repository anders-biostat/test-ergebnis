import pandas as pd
import argparse
import os
import sys
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("--ods", required=True)

try:
    args = parser.parse_args()
except:
    parser.print_help()
    sys.exit(2)

odsfile = args.ods
# odsfile = "./LAMP_Barcodes_2020-04-24.ods"
basename = os.path.basename(odsfile)

csvfile = os.path.splitext(basename)[0] + ".csv"

try:
    subprocess.run(
        ["libreoffice", "--headless", '--convert-to', 'csv', odsfile],
        check=True)
except OSError as e:
    print("Execution failed:", e, file=sys.stderr)


def getSampleIds(samplesNames):
    return samplesNames.str.split("[/&]").map(lambda x: x[0]).drop_duplicates()


def createResults(sampleIds):
    res = pd.DataFrame(sampleIds)
    res[2] = "negative"
    return res


def filterEmpty(res):
    return res[~res[1].isin(["empty", ''])]


def writeResults(res, csvfile):
    res.to_csv(csvfile, index=False, header=False)


dat = pd.read_csv(csvfile, header=None, keep_default_na=False)
samples = dat[~dat.iloc[:, 1].str.contains("CS[0-9]+")]
sampleIds = getSampleIds(samples[1])
res = createResults(sampleIds)
res = filterEmpty(res)
writeResults(res, csvfile)
