import { kebabCase } from 'lodash';
import { z } from 'zod';

import { createRouter } from './context';

export const shortlyRouter = createRouter().query('slug-available', {
  input: z.object({
    slug: z.string(),
  }),
  async resolve({ input: { slug }, ctx }) {
    const sluggified = kebabCase(slug).toLowerCase();
    const isAvailable =
      (await ctx.prisma.shortLink.count({
        where: { slug: { equals: sluggified } },
      })) >= 1;
    return {
      isAvailable,
    };
  },
});
// .query("getAll", {
//   async resolve({ ctx }) {
//     return await ctx.prisma.example.findMany();
//   },
// });
