import React, { useState } from 'react';
import { Container, ToggleLabel, ToggleSelector } from './styles';

// componente que só recebe parametro nao tem return (componente puro)
const Toggle: React.FC = () => {
    const [toggleOnline, setToggleOnline] = useState(false);

    return (
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <ToggleSelector
                checked={toggleOnline}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={() => setToggleOnline(!toggleOnline)}
            />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    );
};

export default Toggle;
