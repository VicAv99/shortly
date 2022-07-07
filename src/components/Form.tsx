import { Anchor, Button, Input, Tooltip } from '@mantine/core';
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
  const {
    mutate,
    data: shortLink,
    isLoading: submitLoading,
  } = trpc.useMutation(['shortly.create-short-link']);
  const onSubmit = (data: FormData) =>
    mutate({ url: data.url, slug: data.slug });
  const { formState, ...form } = useForm<FormData>(formOpts);
  const slugValue = form.watch('slug');
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
      {formState.dirtyFields.slug && (
        <InputIcon size={16} className='block opacity-50' />
      )}
    </Tooltip>
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/12'>
      <Input
        {...form.register('slug', { required: true })}
        placeholder='Choose an awesome slug!'
        rightSection={rightSection}
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
        disabled={!formState.isValid && !data?.isAvailable}
        type='submit'
        variant='subtle'
        fullWidth
        mb={shortLink?.id ? 25 : 300}
        radius='md'
        size='md'
        loading={submitLoading}
      >
        Generate Short Link
      </Button>
      {shortLink?.id && (
        <div className='text-center'>
          <Anchor
            mb={300}
            variant='link'
            align='center'
            underline
            className='cursor-pointer text-center'
            target='_blank'
            href={`${window.location.origin}/${shortLink.slug}`}
          >
            {`${window.location.origin}/${shortLink.slug}`}
          </Anchor>
        </div>
      )}
    </form>
  );
};
