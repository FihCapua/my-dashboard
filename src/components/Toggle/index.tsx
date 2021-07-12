import React from 'react';
import { Container, ToggleLabel, ToggleSelector } from './styles';

// componente que só recebe parametro nao tem return (componente puro)
const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector
            checked
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => console.log('Mudou')}
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
);

export default Toggle;
