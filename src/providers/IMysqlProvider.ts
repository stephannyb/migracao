import { AuditoriaVale } from '../models/AuditoriaVale';

export interface IMysqlProvider {
  fetch(): Promise<AuditoriaVale[]>;
}
