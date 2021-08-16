import React, { useMemo, useState } from 'react';
import emojis from '../../utils/emojis';
import Toggle from '../Toggle';
import { Container, Profile, UserName, Welcome } from './styles';

import { useTheme } from '../../hooks/theme';

const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === 'dark' ? true : false
    );

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme); // se nao for dark inverte pra light e vice e versa
        toggleTheme(); // e executa o tema
    };

    // useMemo - memoriza valores
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length); // emojis randomicos
        return emojis[indice];
    }, []);
    return (
        <>
            <Container>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />

                <Profile>
                    <Welcome>Olá, {emoji}</Welcome>
                    <UserName>Fiama de Capua</UserName>
                </Profile>
            </Container>
        </>
    );
};

export default MainHeader;
