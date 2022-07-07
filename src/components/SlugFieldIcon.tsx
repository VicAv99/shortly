import { Tooltip } from '@mantine/core';
import React from 'react';
import { Control, useFormState } from 'react-hook-form';
import { FiCheck, FiLoader, FiX } from 'react-icons/fi';

interface FormData {
  slug: string;
  url: string;
}

interface SlugFieldIconProps {
  fetchLoading: boolean;
  isAvailable?: boolean;
  control: Control<FormData>;
}

export const ShortlySlugFieldIcon = ({
  control,
  ...props
}: SlugFieldIconProps) => {
  const { dirtyFields } = useFormState({ control });
  const InputIcon = props.fetchLoading
    ? FiLoader
    : !props.fetchLoading && props.isAvailable
    ? FiCheck
    : FiX;

  return (
    <Tooltip
      label='We have to make sure your slug is available'
      position='top'
      placement='end'
    >
      {dirtyFields.slug && <InputIcon size={16} className='block opacity-50' />}
    </Tooltip>
  );
};
