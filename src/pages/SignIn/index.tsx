import React from 'react';
import LogoImg from '../../assets/logo.svg';
import { Container, Logo, Form, FormTitle } from './styles';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={LogoImg} alt="Minha Carteira" />
                <h1>Minha Carteira</h1>
            </Logo>

            <Form>
                <FormTitle>Entrar</FormTitle>

                <input type="text"></input>
                <input type="text"></input>

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    );
};

export default SignIn;
