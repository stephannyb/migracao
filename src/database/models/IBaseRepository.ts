import { AuditoriaVale } from '../../models/AuditoriaVale';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseRepository<T> {
  queryBuilder(): any;
  create(data: Partial<T>): Promise<T>;
  findOne(data: { where: Partial<T> }): Promise<T | undefined>;
  update({
    id,
    new_values
  }: {
    id: string;
    new_values: Partial<T>;
  }): Promise<void>;
  findAll(data?: {
    where?: Partial<T>;
    order?: [keyof T, 'asc' | 'desc'];
    limit?: number;
    offset?: number;
    whereIsNull?: keyof T;
  }): Promise<T[]>;
  upsert(data: AuditoriaVale[]): Promise<void>;
}
