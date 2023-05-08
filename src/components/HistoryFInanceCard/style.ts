import styled, {keyframes} from 'styled-components';

interface ITagProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`

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

    animation: ${animate} 0.5s ease-in;

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

    > div h4 {
        font-weight: 800;
        font-size: 20px;
        margin-bottom: 5px;
    }
`

export const Tag = styled.div<ITagProps>`
    position: absolute;
    left: 0;
    width: 10px;
    height: 30px;
    background-color: ${props => props.color};
`