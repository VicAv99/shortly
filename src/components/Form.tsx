import { Button, Input, Tooltip } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiLoader, FiX } from 'react-icons/fi';

import { trpc } from '../utils/trpc';

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
  const onSubmit = (data: FormData) => console.log(data);
  const { register, handleSubmit, watch } = useForm<FormData>(formOpts);
  const slugValue = watch('slug');
  const [debounced] = useDebouncedValue(slugValue, 400);
  const { data, isFetching, isLoading } = trpc.useQuery([
    'shortly.slug-available',
    { slug: debounced },
  ]);

  const InputIcon = isLoading
    ? FiLoader
    : !isLoading && data?.isAvailable
    ? FiCheck
    : FiX;

  const rightSection = (
    <Tooltip
      label='We have to make sure your slug is available'
      position='top'
      placement='end'
    >
      <InputIcon size={16} className='block opacity-50' />
    </Tooltip>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-5/12'>
      <Input
        {...register('slug')}
        placeholder='Choose an awesome slug!'
        rightSection={rightSection}
        mb={25}
        size='lg'
      />
      <Input
        {...register('url')}
        placeholder='Enter your long url!'
        size='lg'
        mb={25}
      />
      <Button
        disabled={!data?.isAvailable || isFetching}
        type='submit'
        variant='subtle'
        fullWidth
        mb={300}
        radius='md'
        size='md'
      >
        Generate Short Link
      </Button>
    </form>
  );
};
