import { mysqlProvider } from '../providers';
import AuditoriaValesRepository from '../repositories/knex/AuditoriaValesRepository';
import { UpdateDataService } from '../services/UpdateDataService';

export const updateDataService = new UpdateDataService(
  mysqlProvider,
  AuditoriaValesRepository
);
