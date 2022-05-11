import { IMysqlProvider } from '../providers/IMysqlProvider';
import { IAuditoriaValesRepository } from '../repositories/IAuditoriaValesRepository';
import { consoleLog } from '../utils/logger';

export class UpdateDataService {
  constructor(
    private mysqlProvider: IMysqlProvider,
    private auditoriaValesRepository: IAuditoriaValesRepository
  ) {}

  public async execute(): Promise<void> {
    const data = await this.mysqlProvider.fetch();
    consoleLog('upsert running...');
    try {
      await this.auditoriaValesRepository.upsert(data);
      consoleLog('upsert finished...');
    } catch (err) {
      consoleLog(err);
    }
  }
}
