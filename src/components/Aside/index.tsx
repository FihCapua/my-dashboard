import React, { useState } from "react";
import {
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemButton,
  MenuItemLink,
  ThemeToggleFooter,
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
import { useTheme } from "../../hook/theme";
import { ToggleComponent } from "../Toggle";

export const Aside: React.FC = () => {
    const { signOut } = useAuth();
    const { toggleTheme, theme} = useTheme();
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme()
    }
  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
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

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <ToggleComponent
            checked={darkTheme}
            labelLeft="Light"
            labelRight="Dark"
            onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};
