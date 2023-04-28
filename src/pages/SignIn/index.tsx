import React from "react";
import { Container, Form, FormTitle, Logo } from "./style";

import logoImg from "../../assets/logo.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Logo Meu Dashboard" />
        <h2>Meu Dashboard</h2>
      </Logo>
      <Form onSubmit={() => {}}>
        <FormTitle>Entrar</FormTitle>

        <Input 
            type="email"
            placeholder="E-mail"
            required 
        />
        <Input 
            type="password"
            placeholder="Senha" 
            required
        />
        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};
