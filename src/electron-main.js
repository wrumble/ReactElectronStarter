const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");
const url = require("url");

if (process.env.ELECTRON_START_URL) {
  require("electron-reload")(__dirname);
}

let mainWindow;

app.on("ready", () => {
  let height = 800
  let width = 400
  let mainWindow = new BrowserWindow({
    height: height,
    width: width,
    minHeight: height,
    minWidth: width,
    resizable: false
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./build/index.html"),
      protocol: "file:",
      slashes: true
    });

  mainWindow.loadURL(startUrl);
  mainWindow.setAspectRatio(width/height);

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});

app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});