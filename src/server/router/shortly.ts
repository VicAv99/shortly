import { z } from 'zod';

import { createRouter } from './context';

export const shortlyRouter = createRouter().query('hello', {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `Hello ${input?.text ?? 'world'}`,
    };
  },
});
// .query("getAll", {
//   async resolve({ ctx }) {
//     return await ctx.prisma.example.findMany();
//   },
// });
