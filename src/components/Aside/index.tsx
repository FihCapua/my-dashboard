import React, { useState } from "react";
import {
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemButton,
  MenuItemLink,
  Title,
  ToggleMenu,
} from "./style";
import logo from "../../assets/logo.svg";

import {
  MdArrowDownward,
  MdArrowUpward,
  MdDashboard,
  MdExitToApp,
  MdClose,
  MdMenu
} from "react-icons/md";
import { useAuth } from "../../hook/auth";

export const Aside: React.FC = () => {
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const { signOut } = useAuth();

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }
  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu>
            {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>
        <LogImg src={logo} alt="Logo meu dashboard" />
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

        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};
