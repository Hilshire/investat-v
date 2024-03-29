import { EntityTarget, ObjectLiteral } from 'typeorm';
import { prepareConnection } from '@/server/connection';

export async function getRepo<T extends ObjectLiteral>(entity: EntityTarget<T>) {
  const appDataSource = await prepareConnection();
  const repo = await appDataSource.getRepository(entity)
  return repo;
}

export async function getManager() {
  return (await prepareConnection()).manager
}

export const pick = <T, K extends keyof T = keyof T>(object: T, keys: K[]): Pick<T, K> =>
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key]
    }
    return obj
  }, {} as Pick<T, K>);

export * from './type';
