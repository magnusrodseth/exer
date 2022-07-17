/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter';
import { sessionRouter } from './session';
import superjson from 'superjson';
import { sessionEntryRouter } from './sessionEntry';
import { exerciseRouter } from './exercise';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  .query('health', {
    async resolve() {
      return 'alive';
    },
  })
  .merge('session.', sessionRouter)
  .merge('sessionEntry.', sessionEntryRouter)
  .merge('exercise.', exerciseRouter);

export type AppRouter = typeof appRouter;
