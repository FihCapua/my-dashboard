import styled from 'styled-components';

interface IContainerProps {
    color: string;
}

interface ITagProps {
    color: string;
}

export const Container = styled.li<IContainerProps>`
    background-color: ${(props) => props.color};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin: 10px 0;
    padding: 12px 10px;
    cursor: pointer;
    transition: all 0.3s;

    position: relative;

    &:hover {
        opacity: 0.7;
        transform: translateX(10px);
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }
`;

export const Tag = styled.div<ITagProps>`
    position: absolute;
    left: 0;
    width: 8px;
    height: 60%;

    background-color: ${(props) => props.color};
`;
