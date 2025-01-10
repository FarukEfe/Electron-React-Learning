import { getRandomValues } from 'crypto';
import osUtils from 'os-utils'
import os, { totalmem } from 'os'
import fs from 'fs'

// Determines the interval (in milliseconds) that updates the values
const POLLING_INTERVAL = 500;

export function pollResources() {
    setInterval(async () => {
        const cpuUsage = await getCPU();
        const ramUsage = getRAM();
        const storageData = getStorageData();
        console.log(cpuUsage, ramUsage, storageData.usage);
    }, POLLING_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        totalMemoryGB,
    }
}

function getCPU() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

function getRAM() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        // Get storage in gigs
        total: Math.floor(total / 1_000_000_000),
        // Get usage percentage
        usage: 1 - free / total
    }
}