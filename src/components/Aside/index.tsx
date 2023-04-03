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
                <MenuItemLink href="#">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdExitToApp />
                    Dashboard
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}