import { kebabCase } from 'lodash';
import { z } from 'zod';

import { createRouter } from './context';

export const shortlyRouter = createRouter()
  .query('slug-available', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input: { slug }, ctx }) {
      const sluggified = kebabCase(slug).toLowerCase();
      const isAvailable = !(
        (await ctx.prisma.shortLink.count({
          where: { slug: { equals: sluggified } },
        })) >= 1
      );
      return {
        isAvailable,
      };
    },
  })
  .mutation('create-short-link', {
    input: z.object({
      slug: z.string(),
      url: z.string().url(),
    }),
    async resolve({ input: { slug, url }, ctx }) {
      const sluggified = kebabCase(slug).toLowerCase();
      const shortLink = await ctx.prisma.shortLink.create({
        data: {
          slug: sluggified,
          url,
        },
      });

      return {
        ...shortLink,
      };
    },
  });
