import { z } from 'zod';

export * from './session';
export * from './sessionentry';
export * from './set';
export * from './exercise';

export const IdModel = z.number().int();
