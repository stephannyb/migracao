import { KnexBaseRepository } from '../../database/knex/BaseRepository';
import { auditoria_vales } from '../../database/knex/utils/table_names';
import { AuditoriaVale } from '../../models/AuditoriaVale';

class AuditoriaValesRepository extends KnexBaseRepository<AuditoriaVale> {
  constructor() {
    super(auditoria_vales);
  }
}

export default new AuditoriaValesRepository();
