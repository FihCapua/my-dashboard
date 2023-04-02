import React, { useState } from "react";
import { Container, ToggleLabel, SwicthToggle } from "./style";

export const Toggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  return (
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <SwicthToggle
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={handleChange}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  );
};
