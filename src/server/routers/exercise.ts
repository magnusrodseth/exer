import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { IdModel } from '~/schemas/id';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultExerciseSelect = Prisma.validator<Prisma.ExerciseSelect>()({
  id: true,
  name: true,
  muscleGroups: true,
  motion: true,
});

export const exerciseRouter = createRouter()
  .query('all', {
    async resolve() {
      return prisma.exercise.findMany({
        select: defaultExerciseSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: IdModel,
    }),
    async resolve({ input }) {
      const { id } = input;
      const exercise = await prisma.session.findUnique({
        where: { id },
        select: defaultExerciseSelect,
      });
      if (!exercise) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No exercise with id '${id}'`,
        });
      }
      return exercise;
    },
  });
