import os, sys

from flask import Flask
import json
from json import JSONEncoder
import numpy as np

app = Flask(__name__)

def get_git_root():
  home_path = os.environ['HOME']
  search_path = os.getcwd()
  while search_path != home_path:
    dirs = os.listdir(search_path)
    if '.git' in dirs:
      return search_path
    search_path = os.path.join(os.sep, *search_path.split('/')[:-1])
  return ''

GIT_ROOT = get_git_root()
if not GIT_ROOT:
  exit()

data_path = os.path.join(GIT_ROOT, *['data', 'data.csv'])

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
  print('[ENDPOINT] init')
  return encodeNumpyData

@app.route('/calc')
def get_calc():
  pass

if __name__ == "__main__":
  app.run(host="127.0.0.1", port=5000)
