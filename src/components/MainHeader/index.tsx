import React, { useMemo, useState } from "react";
import { Container, Profile, Welcome, Username } from "./style";
import { useTheme } from "../../hook/theme";
import emojis from "../../utils/emojis";
import { Toggle } from "../Toggle";

export const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const emoji = useMemo(() => {
    const index = Math.floor(Math.random() * emojis.length);

    return emojis[index];
  }, []);

  return (
    <Container>
      <Toggle
        checked={darkTheme}
        labelLeft="Light"
        labelRight="Dark"
        onChange={handleChangeTheme}
      />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <Username>Fih</Username>
      </Profile>
    </Container>
  );
};
