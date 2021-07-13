import React from 'react';
import { Container, TitleContainer, Controllers } from './styles';

const ContentHeader: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
                <h3>Teste</h3>
            </TitleContainer>
            <Controllers>
                <button type="button">Botao A</button>
                <button type="button">Botao B</button>
            </Controllers>
        </Container>
    );
};

export default ContentHeader;
