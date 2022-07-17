import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { IdModel } from '~/schemas/id';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultSessionSelect = Prisma.validator<Prisma.SessionSelect>()({
  id: true,
  date: true,
});

export const sessionRouter = createRouter()
  .mutation('add', {
    input: z.object({
      date: z.date(),
    }),
    async resolve({ input }) {
      const session = await prisma.session.create({
        data: {
          date: input.date,
        },
        select: defaultSessionSelect,
      });
      return session;
    },
  })
  .query('all', {
    async resolve() {
      return prisma.session.findMany({
        select: defaultSessionSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: IdModel,
    }),
    async resolve({ input }) {
      const { id } = input;
      const session = await prisma.session.findUnique({
        where: { id },
        select: defaultSessionSelect,
      });
      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No session with id '${id}'`,
        });
      }
      return session;
    },
  })
  .mutation('update', {
    input: z.object({
      id: IdModel,
      // TODO
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const session = await prisma.session.update({
        where: { id },
        data,
        select: defaultSessionSelect,
      });
      return session;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: IdModel,
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.session.delete({ where: { id } });
      return {
        id,
      };
    },
  });
