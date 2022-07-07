import Head from 'next/head';

import { ShortlyForm } from '../components/Form';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shortly.ink!</title>
        <meta name='description' content='Super simple url shortener!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ShortlyForm />
    </>
  );
};

export default Home;
