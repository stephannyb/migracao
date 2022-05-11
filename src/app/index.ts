import schedule from 'node-schedule';
import { updateDataService } from '../container';
import { consoleLog } from '../utils/logger';

schedule.scheduleJob('9 * * * *', async () => {
  await updateDataService.execute();
});

consoleLog('Schedule running...');
