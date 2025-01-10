import {app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './util.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    if (isDev()) {
        // The runtime in development mode

    } else {
        // The runtime in deployment mode
    }
});