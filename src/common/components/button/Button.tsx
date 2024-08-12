import React, { ButtonHTMLAttributes } from 'react';
import s from './Button.module.scss';

type Props = {
  title: string;
  callBack: () => void;
  className?: string;
  isDisabled?: boolean;
  active?: boolean;
  accent?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({ title, callBack, isDisabled, active, accent, ...restProps }: Props) => {
  const finalClassName = `
    ${s.button} 
    ${active ? s.active : ''}
    ${accent ? s.accent : ''}`;

  const onClickHandler = () => {
    callBack();
  };
  return (
    // <button className={styles.button} onClick={onClickHandler}>
    <button onClick={onClickHandler} disabled={isDisabled} {...restProps} className={finalClassName}>
      {title}
    </button>
  );
};
