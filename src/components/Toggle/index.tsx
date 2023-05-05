import React, { useState } from "react";
import { Container, ToggleLabel, SwicthToggle } from "./style";

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

export const ToggleComponent: React.FC<IToggleProps> = ({
  labelLeft,
  labelRight,
  checked,
  onChange
}) => {
  return (
    <Container>
      <ToggleLabel>{labelLeft}</ToggleLabel>
      <SwicthToggle
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={onChange}
      />
      <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>
  );
};
