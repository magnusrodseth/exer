import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { IdModel } from '~/schemas';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

export const sessionEntryRouter = createRouter()
  .mutation('add', {
    input: z.object({
      sessionId: IdModel,
      exerciseId: IdModel,
    }),
    async resolve({ input }) {
      const { sessionId, exerciseId } = input;
      const sessionEntry = await prisma.sessionEntry.create({
        data: {
          sessionId,
          exerciseId,
        },
      });
      return sessionEntry;
    },
  })
  .query('bySessionId', {
    input: z.object({
      id: IdModel,
    }),
    async resolve({ input }) {
      const { id } = input;

      const result = await prisma.sessionEntry.findMany({
        where: {
          sessionId: {
            equals: id,
          },
        },
      });

      return result;
    },
  });
