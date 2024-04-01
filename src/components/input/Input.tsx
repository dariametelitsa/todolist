import React from 'react';
import styles from "../todolist/Todolist.module.scss";

export const Input = () => {
    return (
        <div>
            <input type="text"/>
            <button className={styles.btnRemove}>+</button>
        </div>
    );
};

