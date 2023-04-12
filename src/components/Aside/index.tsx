import React from "react";
import { Container, Header, LogImg, MenuContainer, MenuItemLink, Title } from "./style"
import logo from '../../assets/logo.svg'

import { MdArrowDownward, MdArrowUpward, MdDashboard, MdExitToApp } from 'react-icons/md'

export const Aside: React.FC = () => {
    return(
        <Container>
            <Header>
                <LogImg src={logo} alt='Logo meu dashboard' />
                <Title>Minha carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/dashboard">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}