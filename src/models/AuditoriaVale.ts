import { BaseModel } from '../database/models/BaseModel';

export class AuditoriaVale extends BaseModel {
  cod_agente!: number;
  matricula_agente!: number;
  cod_auxilio_alimentacao!: number;
  cod_pedido_auxilio_alimentacao!: number;
  cod_pagamento_auxilio_alimentacao!: number;
  quantidade_auxilio_alimentacao!: number;
  cod_posto!: number;
  cod_pagamento!: number;
  cod_escala!: number;
  cod_remessa!: number;
  id_unidade_pedido!: number;
  id_unidade_escala!: number;

  cpf_agente!: string;
  nome_agente!: string;
  posto_graduacao!: string;
  inicio_posto!: string;
  termino_posto!: string;
  interevalo_posto!: string;
  situacao_remessa!: string;
  nome_tipo_escala!: string;
  modalidade_policiamento!: string;
  processo_policiamento!: string;
  tipo_policiamento!: string;
  situacao_escala!: string;
  sigla_unidade_escala!: string;
  sigla_unidade_pedido!: string;
  nome_centro_custo!: string;
  data_escala!: string;

  valor_unitario_auxilio_alimentacao!: number;
  valor_auxilio_alimentacao!: number;
  auxilio_alimentacao_glosado!: number;
  valor_pagamento!: number;
  valor_unitario_glosado!: number;
  quantidade_glosada!: number;
  valor_glosado!: number;
}
