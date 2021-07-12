import React, { useMemo } from 'react';
import emojis from '../../utils/emojis';
import { Container, Profile, UserName, Welcome } from './styles';

const MainHeader: React.FC = () => {
    // useMemo - memoriza valores
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length); // emojis randomicos
        return emojis[indice];
    }, []);
    return (
        <>
            <Container>
                <h1>Toggle</h1>

                <Profile>
                    <Welcome>Olá, {emoji}</Welcome>
                    <UserName>Fiama de Capua</UserName>
                </Profile>
            </Container>
        </>
    );
};

export default MainHeader;
