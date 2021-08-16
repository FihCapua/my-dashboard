import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

// esse tipo será um input com todos os atributos do HTML
type IInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IInputProps> = ({ ...rest }) => <Container {...rest} />;

export default Input;
