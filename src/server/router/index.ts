// src/server/router/index.ts
import superjson from 'superjson';

import { createRouter } from './context';
import { shortlyRouter } from './shortly';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('shortly.', shortlyRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
