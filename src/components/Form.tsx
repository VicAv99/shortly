import { Button, Input } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';

import { trpc } from '../utils/trpc';
import { ShortlySlugFieldIcon } from './SlugFieldIcon';
import { ShortlyUrl } from './Url';

interface FormData {
  slug: string;
  url: string;
}

const formOpts = {
  defaultValues: {
    slug: '',
    url: '',
  },
};

export const ShortlyForm = () => {
  const { formState, ...form } = useForm<FormData>(formOpts);
  const { mutate, ...short } = trpc.useMutation(['shortly.create-short-link']);
  const onSubmit = (data: FormData) => mutate(data);

  const slugValue = form.watch('slug');
  const [debounced] = useDebouncedValue(slugValue, 400);
  const { data, isLoading } = trpc.useQuery([
    'shortly.slug-available',
    { slug: debounced },
  ]);

  console.log('data', isLoading || !data?.isAvailable || !formState.isValid);
  console.log('dataff', isLoading, !data?.isAvailable, !formState.isValid);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/12'>
      <Input
        {...form.register('slug', { required: true })}
        placeholder='Choose an awesome slug!'
        rightSection={
          <ShortlySlugFieldIcon
            control={form.control}
            fetchLoading={isLoading}
            isAvailable={data?.isAvailable}
          />
        }
        mb={25}
        size='lg'
      />
      <Input
        {...form.register('url', { required: true })}
        placeholder='Enter your long url!'
        size='lg'
        mb={25}
      />
      <Button
        disabled={isLoading || !data?.isAvailable || !formState.isValid}
        type='submit'
        variant='subtle'
        fullWidth
        mb={short.data?.id ? 250 : 300}
        radius='md'
        size='md'
        loading={short.isLoading}
      >
        Generate Short Link
      </Button>
      {short.isError && (
        <div className='text-red-500'>{short.error.message}</div>
      )}
      <ShortlyUrl shortLink={short.data} />
    </form>
  );
};
