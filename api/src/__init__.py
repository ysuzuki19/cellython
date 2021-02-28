from flask import Flask
import json
from json import JSONEncoder
import numpy as np

app = Flask(__name__)

data_path = '../data/data.csv'

matrix = []
with open(data_path) as f:
  lines = f.readlines()
  for line in lines:
    line = line.strip('\n')
    line = line.split(',')
    matrix.append(line)
matrix = np.array(matrix)
print(matrix)

class NumpyArrayEncoder(JSONEncoder):
  def default(self, obj):
    if isinstance(obj, np.ndarray):
      return obj.tolist()
    return JSONEncoder.default(self, obj)

@app.route('/init')
def get_init_data():
  encodeNumpyData = json.dumps(
      {'array': matrix},
      cls=NumpyArrayEncoder)
  return encodeNumpyData

@app.route('/calc')
def get_calc():
  pass
