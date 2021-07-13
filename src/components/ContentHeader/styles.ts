import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const TitleContainer = styled.div`
    > h3 {
        color: ${(props) => props.theme.colors.white};

        &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 5px solid ${(props) => props.theme.colors.warning};
        }
    }
`;

export const Controllers = styled.div``;
