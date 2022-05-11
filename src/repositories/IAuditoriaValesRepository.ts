import { KnexBaseRepository } from '../database/knex/BaseRepository';
import { AuditoriaVale } from '../models/AuditoriaVale';

export type IAuditoriaValesRepository = KnexBaseRepository<AuditoriaVale>;
