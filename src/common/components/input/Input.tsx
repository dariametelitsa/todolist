import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import TextField from '@mui/material/TextField';

type InputProps = {
  changeTitle: (title: string) => void;
  title: string;
  onKeyDown: () => void;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ changeTitle, title, onKeyDown, ...restProps }: InputProps) => {
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changeTitle(event.currentTarget.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onKeyDown();
    }
  };
  return (
    <TextField
      id="outlined-basic"
      onChange={onChangeInputHandler}
      onKeyDown={onKeyDownHandler}
      label={'Название группы'}
      variant="outlined"
      value={title}
      error={!!restProps.error}
      helperText={restProps.error ? "Title can't be empty" : ''}
      size="small"
    />

    // <input value={todolistTitle}
    //        onChange={onChangeInputHandler}
    //        onKeyDown={onKeyDownHandler}
    //        type="text"
    //        {...restProps}/>
  );
};
