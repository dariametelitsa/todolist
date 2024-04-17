import React, { ButtonHTMLAttributes } from 'react';
import s from './Button.module.scss';

type ButtonPropsType = {
    title: string;
    callBack: () => void;
    className?: string;
    isDisabled?: boolean;
    active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: React.FC<ButtonPropsType> = ({title, callBack, isDisabled, active, ...restProps}: ButtonPropsType) => {

    // const finalClassName = s.button
    //     + (disabled
    //         ? ' ' + s.disabled
    //         : color === 'red'
    //             ? ' ' + s.red
    //             : color === 'secondary'
    //                 ? ' ' + s.secondary
    //                 : ' ' + s.default);

    // const finalClassName = s.button + ' ' + s.red;
    // const finalClassName = `${s.button} ${s.red}`;
    const finalClassName = `${s.button} ${active ? s.active : ''}`;
    
    const onClickHandler = () => {
        callBack();
    }
    return (
        // <button className={styles.button} onClick={onClickHandler}>
        <button onClick={onClickHandler} disabled={isDisabled} {...restProps} className={finalClassName}>
            {title}
        </button>
    );
};
