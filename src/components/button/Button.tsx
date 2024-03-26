import React from 'react';
import styles from './Button.module.scss';

type ButtonPropsType = {
    name: string,
    callBack: () => void,
    className?: string,
}
export const Button: React.FC<ButtonPropsType> = ({name, callBack}: ButtonPropsType) => {

    const onClickHandler = () => {
        callBack();
    }

    return (
        <button className={styles.button} onClick={onClickHandler}>
            {name}
        </button>
    );
};
