import { Button, Input, Tooltip } from '@mantine/core';
import Head from 'next/head';
import { FiInfo } from 'react-icons/fi';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  const rightSection = (
    <Tooltip label='We do not send spam' position='top' placement='end'>
      <FiInfo size={16} className='block opacity-50' />
    </Tooltip>
  );

  return (
    <>
      <Head>
        <title>Shortly.ink!</title>
        <meta name='description' content='Super simple url shortener!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-5/12'>
        <Input
          placeholder='Choose an awesome slug!'
          rightSection={rightSection}
          mb={25}
          size='lg'
        />
        <Input
          placeholder='Enter your long url!'
          rightSection={rightSection}
          size='lg'
          mb={25}
        />
        <Button
          type='submit'
          variant='subtle'
          fullWidth
          mb={300}
          radius='md'
          size='md'
        >
          Generate Short Link
        </Button>
      </div>
    </>
  );
};

export default Home;
