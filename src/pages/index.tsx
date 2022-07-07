import Head from 'next/head';

import { trpc } from '../utils/trpc';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <>
      <Head>
        <title>Shortly.ink!</title>
        <meta name='description' content='Super simple url shortener!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      todo: add stuff
    </>
  );
};

export default Home;
