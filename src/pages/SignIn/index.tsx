import React from 'react';
import LogoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import { Container, Logo, Form, FormTitle } from './styles';

const SignIn: React.FC = () => {
    const loaderPrevent = (e) => {
        e.preventDefault();
    };
    return (
        <Container>
            <Logo>
                <img src={LogoImg} alt="Minha Carteira" />
                <h1>Minha Carteira</h1>
            </Logo>

            <Form onSubmit={loaderPrevent}>
                <FormTitle>Entrar</FormTitle>

                <Input type="email" required placeholder="Email:" />
                <Input type="password" required placeholder="Senha:" />

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    );
};

export default SignIn;
