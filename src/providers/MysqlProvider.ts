import { AuditoriaVale } from '../models/AuditoriaVale';
import { consoleLog } from '../utils/logger';
import { MySqlknexConnection } from './connection';
import { IMysqlProvider } from './IMysqlProvider';

class MysqlProvider implements IMysqlProvider {
  private client;
  constructor() {
    this.client = MySqlknexConnection;
  }

  public async fetch(): Promise<AuditoriaVale[]> {
    consoleLog('fetch running...');
    const data = await this.client.raw(`
      SELECT 
        a.id as cod_agente,
        a.matricula as matricula_agente,
        a.cpf as cpf_agente,
        a.nome as nome_agente,
        t.nome as posto_graduacao,
        aa.id as cod_auxilio_alimentacao,
        aa.remessa_vale_refeicao_id as cod_pedido_auxilio_alimentacao,
        aa.pagamento_id as cod_pagamento_auxilio_alimentacao,
        aa.valor_unitario as valor_unitario_auxilio_alimentacao,
        aa.quantidade as quantidade_auxilio_alimentacao,
        aa.valor_unitario * aa.quantidade as valor_auxilio_alimentacao,
        aa.glosada as auxilio_alimentacao_glosado,
        p.id as cod_posto,
        p.inicio as inicio_posto,
        p.termino as termino_posto,
        TIMEDIFF(p.termino, p.inicio) as interevalo_posto,
        pgaa.id as cod_pagamento,
        pgaa.valor as valor_pagamento,
        raa.id as cod_remessa,
        raa.situacao as situacao_remessa,
        e.id as cod_escala,
        e.data as data_escala,
        e.situacao as situacao_escala,
        te.nome as nome_tipo_escala,
        mp.nome as modalidade_policiamento,
        pp.nome as processo_policiamento,
        ts.nome as tipo_policiamento,
        ue.id as id_unidade_escala,
        ue.sigla as sigla_unidade_escala,
        undped.id as id_unidade_pedido,
        undped.sigla as sigla_unidade_pedido,
        undpag.nome as nome_centro_custo,
        gaa.valor_unitario as valor_unitario_glosado,
        gaa.quantidade as quantidade_glosada,
        gaa.valor_unitario * gaa.quantidade as valor_glosado
    
      FROM vales_refeicoes aa
        JOIN funcoes f ON aa.funcao_id = f.id
          JOIN agentes a ON f.agente_id = a.id
            JOIN postos p ON f.posto_id = p.id
              JOIN pagamentos pgaa ON aa.pagamento_id = pgaa.id
                JOIN remessa_pagamentos raa ON pgaa.remessa_pagamento_id = raa.id
                  JOIN escalas e ON p.escala_id = e.id
                    JOIN unidades_pagadoras undpag ON raa.unidade_pagadora_id = undpag.id
                      JOIN tipos_escala te ON te.id = e.tipo_escala_id
                        JOIN modalidades_policiamento mp ON p.modalidade_policiamento_id = mp.id
                          JOIN processos_policiamento pp ON p.processo_policiamento_id = pp.id
                            JOIN tipos_servico ts ON p.tipo_servico_id = ts.id
                              JOIN unidades ue ON e.unidade_id = ue.id       
                                JOIN remessas_vales_refeicoes pdaa ON aa.remessa_vale_refeicao_id = pdaa.id
                                  JOIN unidades undped ON pdaa.unidade_id = undped.id
                                    JOIN titulos t ON a.titulo_id = t.id
                                      LEFT JOIN glosas gaa ON gaa.origem_id = aa.id
      WHERE
      aa.deleted_at IS NULL;
    `);
    consoleLog('fetch finished...');

    // const response = data[0];

    return data[0];
  }
}
//  aa.deleted_at IS NULL

export { MysqlProvider };
