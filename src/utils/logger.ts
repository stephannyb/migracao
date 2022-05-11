/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export const consoleLog = (message: any) =>
  console.log(`${new Date().toISOString()} | ${message}}`);
export const consoleError = (message: any) =>
  console.error(`${new Date().toISOString()} | ${message}}`);
