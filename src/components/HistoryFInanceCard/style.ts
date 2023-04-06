import styled from 'styled-components';

interface ITagProps {
    color: string;
}

export const Container = styled.li`
    list-style: none;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    margin: 10px 0;
    padding: 12px 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    transition: all .3s;
    position: relative;

    &:hover {
        opacity: .7;
        transform: translateX(10px);
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding-left: 10px;
    }
`

export const Tag = styled.div<ITagProps>`
    position: absolute;
    left: 0;
    width: 10px;
    height: 30px;
    background-color: ${props => props.color};
`