import React from 'react';
import styles from './Button.module.scss';

type ButtonPropsType = {
    title: string,
    onClick?: () => void,
    className?: string,
}
export const Button: React.FC<ButtonPropsType> = ({title}: ButtonPropsType) => {
    return (
        <button className={styles.button}>
            {title}
        </button>
    );
};
