import React from 'react';
import styles from './Button.module.scss';

type ButtonPropsType = {
    name: string;
    callBack: () => void;
    className?: string;
    isDisabled?: boolean;
}
export const Button: React.FC<ButtonPropsType> = ({name, callBack, isDisabled}: ButtonPropsType) => {

    const onClickHandler = () => {
        callBack();
    }

    return (
        // <button className={styles.button} onClick={onClickHandler}>
        <button  onClick={onClickHandler} disabled={isDisabled}>
            {name}
        </button>
    );
};
