import React from "react";

import { Container } from "./style";

interface IMessageBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

export const MessageBox: React.FC<IMessageBoxProps> = ({
  title,
  description,
  footerText,
  icon,
}) => {
  return (
    <Container>
      <header>
        <h1>{title}</h1>
        <div>
          <p>{description}</p>
          <img src={icon} alt="Análise da carteira" />
        </div>
      </header>
      <footer>
        <span>{footerText}</span>
      </footer>
    </Container>
  );
};
