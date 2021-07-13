import styled from 'styled-components';

interface iTitleContainerProps {
    lineColor: string;
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const TitleContainer = styled.div<iTitleContainerProps>`
    > h3 {
        color: ${(props) => props.theme.colors.white};

        &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 5px solid ${(props) => props.lineColor};
            margin-top: 3px;
        }
    }
`;

export const Controllers = styled.div`
    display: flex;
`;
