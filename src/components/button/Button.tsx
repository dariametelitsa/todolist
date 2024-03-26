import React from 'react';
import styles from './Button.module.scss';

type ButtonPropsType = {
    title: string,
    //children: never[];
    onClick: () => void,
    className?: string,
}
export const Button: React.FC<ButtonPropsType> = ({title}: ButtonPropsType) => {
    console.log(styles);
    return (
        <button className={styles.button}>
            {title}
        </button>
    );
};
