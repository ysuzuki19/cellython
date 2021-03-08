// Electron側の初期設定
const {PythonShell} = require('python-shell');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  const flask_app = require('child_process').spawn('python', ['./api/src/app.py']); //TODO: const, let or var??

  const rq = require('request-promise');
  const mainAddr = 'http://localhost:5000';

  const openWindow = function() {
    mainWindow = new BrowserWindow({width: 400, height: 300 });
    mainWindow.loadURL(mainAddr);

    // 開発ツールを有効化
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
      electron.session.defaultSession.clearCache(() => {})
      mainWindow = null;
      flask_app.kill('SIGINT');
    });
  };

  const startUp = function() {
    rq(mainAddr)
      .then(function(htmlString) {
        console.log('server started');
        openWindow();
      })
      .catch(function(err) {
        startUp();
      });
  };

  startUp();
});
