import { Knex } from 'knex';
import { auditoria_vales } from '../utils/table_names';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(auditoria_vales, table => {
    /**
     * default fields
     */
    table.increments('id').primary();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    /**
     * custom fields
     */
    table.integer('cod_agente');
    table.integer('matricula_agente');
    table.integer('cod_auxilio_alimentacao').notNullable().unique();
    table.integer('cod_pedido_auxilio_alimentacao');
    table.integer('cod_pagamento_auxilio_alimentacao');
    table.integer('quantidade_auxilio_alimentacao');
    table.integer('cod_pagamento');
    table.integer('cod_escala');
    table.integer('cod_remessa');
    table.integer('id_unidade_pedido');
    table.integer('id_unidade_escala');
    table.integer('cod_posto');

    table.string('cpf_agente');
    table.string('nome_agente');
    table.string('posto_graduacao');
    table.string('inicio_posto');
    table.string('termino_posto');
    table.string('interevalo_posto');
    table.string('situacao_remessa');
    table.string('nome_tipo_escala');
    table.string('modalidade_policiamento');
    table.string('processo_policiamento');
    table.string('tipo_policiamento');
    table.string('situacao_escala');
    table.string('sigla_unidade_escala');
    table.string('sigla_unidade_pedido');
    table.string('nome_centro_custo');
    table.string('data_escala');

    table.decimal('valor_unitario_auxilio_alimentacao');
    table.decimal('valor_auxilio_alimentacao');
    table.decimal('auxilio_alimentacao_glosado');
    table.decimal('valor_pagamento');
    table.decimal('valor_unitario_glosado');
    table.decimal('quantidade_glosada');
    table.decimal('valor_glosado');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(auditoria_vales);
}
