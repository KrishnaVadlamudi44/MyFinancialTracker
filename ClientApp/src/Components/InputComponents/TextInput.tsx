import { TextField } from '@material-ui/core';
import React from 'react';
import { CaseToSentence } from '../../Helpers/Converters';

interface ITextInputInterface {
  name: string;
  value: any;
  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  variant?: 'outlined' | 'standard' | 'filled' | undefined;
  margin?: 'none' | 'dense' | 'normal' | undefined;
  autoFocus?: boolean;
  required?: boolean | false;
  fullwidth?: boolean | true;
  type?: string | undefined;
  autoComplete?: string | undefined;
}

const TextInput = ({
  variant,
  margin,
  autoFocus,
  required,
  fullwidth,
  name,
  type,
  value,
  onChange,
  autoComplete,
}: ITextInputInterface) => {
  return (
    <TextField
      variant={variant ? variant : 'outlined'}
      margin={margin}
      autoFocus={autoFocus}
      required={required}
      fullWidth={fullwidth}
      name={name}
      label={CaseToSentence(name)}
      id={name}
      type={type}
      autoComplete={autoComplete}
      value={value ? value : ''}
      onChange={onChange}
    />
  );
};

export default TextInput;
