import { Input, InputProps } from '@mantine/core';
import React from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

interface ShortlyFieldProps extends Omit<ControllerProps<any, any>, 'render'> {
  inputProps: InputProps<any>;
}

export const ShortlyField = (props: ShortlyFieldProps) => {
  return (
    <Controller
      {...props}
      rules={{ required: 'This field is required', ...props.rules }}
      render={({ field }) => (
        <div className='mb-1'>
          <Input size='lg' mb={10} {...field} {...props.inputProps} />
        </div>
      )}
    />
  );
};
