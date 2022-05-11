/* eslint-disable no-console */
import { Knex } from 'knex';
import { AuditoriaVale } from '../../models/AuditoriaVale';
import { BaseModel } from '../models/BaseModel';
import { IBaseRepository } from '../models/IBaseRepository';
import { knexConnection } from './index';
import { auditoria_vales } from './utils/table_names';

export abstract class KnexBaseRepository<T> implements IBaseRepository<T> {
  private repository: Knex;

  constructor(protected table_name: string) {
    this.repository = knexConnection;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public queryBuilder(): Knex<any, unknown[]> {
    return this.repository;
  }

  public async update({
    id,
    new_values: data
  }: {
    id: string;
    new_values: Partial<T>;
  }): Promise<void> {
    const new_values: Partial<T & BaseModel> = data as Partial<T & BaseModel>;
    delete new_values.id;
    delete new_values.created_at;
    delete new_values.updated_at;
    const tag = `[update][${this.table_name}]${Math.random()}`;
    console.time(tag);
    await this.repository(this.table_name)
      .where('id', '=', id)
      .update({ ...new_values, updated_at: new Date() });
    console.timeEnd(tag);
  }

  public async create(data: Partial<T>): Promise<T> {
    const tag = `[create][${this.table_name}]${Math.random()}`;
    console.time(tag);
    const [obj] = await this.repository(this.table_name)
      .insert(data)
      .returning('*');
    console.timeEnd(tag);
    return obj as T;
  }

  public async findOne({
    where
  }: {
    where: Partial<T>;
  }): Promise<T | undefined> {
    const tag = `[findOne][${this.table_name}]${Math.random()}`;
    console.time(tag);
    const result = await this.repository
      .select('*')
      .from(this.table_name)
      .where(where)
      .first();
    console.timeEnd(tag);
    return result;
  }

  public async findAll(data?: {
    where?: Partial<T>;
    order?: [keyof T, 'asc' | 'desc'];
    limit?: number;
    offset?: number;
    whereIsNull?: keyof T;
  }): Promise<T[]> {
    const query = this.repository.from(this.table_name);

    if (data?.where) query.where(data.where);

    if (data && data.whereIsNull) query.whereNull(data.whereIsNull as string);

    const tag = `[findAll][${this.table_name}]${Math.random()}`;
    console.time(tag);

    if (data?.order) query.orderBy(data.order[0] as string, data.order[1]);

    if (data?.limit) query.limit(data.limit);
    if (data?.offset) query.offset(data.offset * (data?.limit || 0));

    const items = await query.select('*');
    console.timeEnd(tag);
    return items;
  }

  public async upsert(data: AuditoriaVale[]): Promise<void> {
    if (data.length > 0) {
      const serialize = async (start: number): Promise<string> => {
        if (start === data.length) return 'done';
        const end = Math.min(start + 5, data.length);

        const partial = data.slice(start, end);

        await this.repository(auditoria_vales)
          .insert(partial)
          .onConflict('cod_auxilio_alimentacao')
          // .ignore();
          .merge();

        return serialize(end);
      };

      await serialize(0);
    }
  }
}
