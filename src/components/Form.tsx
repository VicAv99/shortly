import { Button, Notification } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';
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
  const { formState, ...form } = useForm<FormData>(formOpts);
  const { mutate, ...short } = trpc.useMutation(['shortly.create-short-link']);
  const onSubmit = (data: FormData) => mutate(data);
  const [notification, setNotification] = React.useState(short.isError);
  const clearError = () => {
    short.reset();
    setNotification(false);
  };

  const slugValue = form.watch('slug');
  const [debounced] = useDebouncedValue(slugValue, 400);
  const { data, isLoading } = trpc.useQuery([
    'shortly.slug-available',
    { slug: debounced },
  ]);

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
          mb={short.data?.id ? 250 : 300}
          radius='md'
          size='md'
          loading={short.isLoading}
        >
          Generate Short Link
        </Button>
        <ShortlyUrl shortLink={short.data} />
        {(notification || short.isError) && (
          <Notification
            onClose={clearError}
            color='red'
            radius='md'
            title='Something Went Wrong'
            className='-mt-20'
          >
            {short.error?.message}
          </Notification>
        )}
      </form>
    </>
  );
};
