import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";


interface ButtonMemoProps extends ButtonProps {}

export const ButtonMemo = React.memo((props: ButtonMemoProps) => {
        return (<Button color={props.color} variant={props.variant}
                        onClick={props.onClick}>{props.title}</Button>)
    }
);

