import {app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './util.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) {
        // Run development mode on localhost
        mainWindow.loadURL('http://localhost:5123');
    } else {
        // Run deployment on build file
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
});