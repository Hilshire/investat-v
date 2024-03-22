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

export * from './type';
