import { Button } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { Control, useForm, ValidationMode } from 'react-hook-form';

import { trpc } from '../utils/trpc';
import { ShortlyField } from './Field';
import { ShortlySlugFieldIcon } from './SlugFieldIcon';
import { ShortlyUrl } from './Url';

interface FormData {
  slug: string;
  url: string;
}

const formOpts = {
  mode: 'onChange' as keyof ValidationMode,
  defaultValues: {
    slug: '',
    url: '',
  },
};

export const ShortlyForm = () => {
  const notify = useNotifications();
  const { formState, ...form } = useForm<FormData>(formOpts);
  const { mutate, ...short } = trpc.useMutation(['shortly.create-short-link']);
  const onSubmit = (data: FormData) => mutate(data);

  const slugValue = form.watch('slug');
  const [debounced] = useDebouncedValue(slugValue, 400);
  const { data, isLoading } = trpc.useQuery([
    'shortly.slug-available',
    { slug: debounced },
  ]);

  useEffect(() => {
    if (short.isError) {
      notify.showNotification({
        color: 'red',
        message: (
          <>Please make sure you find a unique slug and entered a proper url.</>
        ),
        title: 'Something Went Wrong!',
      });
    }
  }, [short.isError]);

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/12'>
        <ShortlyField
          name='slug'
          control={form.control as Control<any, any>}
          inputProps={{
            placeholder: 'Choose an awesome slug!',
            rightSection: (
              <ShortlySlugFieldIcon
                control={form.control}
                fetchLoading={isLoading}
                isAvailable={data?.isAvailable}
              />
            ),
            size: 'lg',
          }}
        />
        <ShortlyField
          name='url'
          control={form.control as Control<any, any>}
          inputProps={{
            placeholder: 'Enter your long url!',
            size: 'lg',
          }}
        />
        <Button
          disabled={isLoading || !data?.isAvailable || !formState.isValid}
          type='submit'
          variant='subtle'
          fullWidth
          mb={short.data?.id ? 72 : 100}
          radius='md'
          size='md'
          loading={short.isLoading}
        >
          Generate Short Link
        </Button>
        <ShortlyUrl shortLink={short.data} />
      </form>
    </>
  );
};
