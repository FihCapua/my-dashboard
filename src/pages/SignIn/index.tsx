import React, { useState } from "react";
import { Container, Form, FormTitle, Logo } from "./style";

import logoImg from "../../assets/logo.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hook/auth";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Logo Meu Dashboard" />
        <h2>Meu Dashboard</h2>
      </Logo>
      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>

        <Input 
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
            type="password"
            placeholder="Senha" 
            required
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};
