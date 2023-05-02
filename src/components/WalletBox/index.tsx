import React from "react";
import { Container } from "./style";
import CountUp from "react-countup";

import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";
import dolar from "../../assets/dolar.svg";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  color: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
}

export const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerLabel,
  color,
  icon,
}) => {
  const selectIcon = () => {
    switch (icon) {
      case "dolar":
        return dolar;
        break;
      case "arrowUp":
        return arrowUp;
        break;
      case "arrowDown":
        return arrowDown;
        break;
      default:
        return undefined;
    }
  };
  return (
    <Container color={color}>
      <section>
        <span>{title}</span>
        <h1>
          <CountUp
            end={amount}
            prefix="R$ "
            separator="."
            decimal=","
            decimals={2}
          />
        </h1>
      </section>
      {selectIcon && <img src={selectIcon()} alt={title} />}
      <small>{footerLabel}</small>
    </Container>
  );
};
