import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import { existsSync, createWriteStream } from 'fs';

let logfileDirectory = `${__dirname}/../../../logfile`;
const logFileName = {
  errorLog: 'error.log',
  commonLog: 'common.log',
  warnLog: 'warn.log',
  debugLog: 'debug.log',
};

export function init(directory: string) {
  logfileDirectory = directory ? `${directory}/logfile` : logfileDirectory;
  if (!existsSync(logfileDirectory)) {
    fs.mkdir(logfileDirectory);
  }
}

export function saveLog2File(
  target: any,
  key: LogLevels,
  desc: PropertyDescriptor,
) {
  // Only available in method type
  if (typeof desc.value === 'function') {
    const originalMethod: loggerfn = desc.value;
    desc.value = async function (...params: (unknown | any)[]) {
      const message: string = params[0];
      // Check message key
      switch (key) {
        case 'debug':
        case 'error':
        case 'log':
        case 'verbose':
        case 'warn':
          const message = originalMethod.apply(this, params);
          if (message) {
            await save(key, message);
          }

          break;
        default:
          return;
      }
    };
  }
}

export async function save(level: LogLevels, message: string) {
  let filename: string;
  switch (level) {
    case 'log':
    case 'verbose':
      filename = `${logfileDirectory}/${logFileName.commonLog}`;
      break;
    case 'debug':
      filename = `${logfileDirectory}/${logFileName.debugLog}`;
      break;
    case 'error':
      filename = `${logfileDirectory}/${logFileName.errorLog}`;
      break;
    case 'warn':
      filename = `${logfileDirectory}/${logFileName.warnLog}`;
      break;
  }
  await fs.appendFile(filename, message);
}
