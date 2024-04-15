import React, { ButtonHTMLAttributes } from 'react';
//import styles from './Button.module.scss';

type ButtonPropsType = {
    title: string;
    callBack: () => void;
    className?: string;
    isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: React.FC<ButtonPropsType> = ({title, callBack, isDisabled, ...restProps}: ButtonPropsType) => {

    const onClickHandler = () => {
        callBack();
    }
    return (
        // <button className={styles.button} onClick={onClickHandler}>
        <button onClick={onClickHandler} disabled={isDisabled} {...restProps}>
            {title}
        </button>
    );
};
