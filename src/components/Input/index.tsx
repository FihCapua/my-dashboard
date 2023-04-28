import React, { InputHTMLAttributes } from "react";
import { Container } from "./style";

type IInputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<IInputProps> = ({ ...rest }) => {
    return(
        <Container {...rest} />
    )
}