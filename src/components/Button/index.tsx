import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// esse tipo será um input com todos os atributos do HTML
type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
    <Container {...rest}>{children}</Container>
);

export default Button;
