import styled, {keyframes} from "styled-components";

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

export const Container = styled.div`
    width: 48%;
    height: 260px;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;

    margin: 10px 0;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    animation: ${animate} 0.5s;

    > header img {
        width: 35px;
        margin-left: 5px;
        margin-top: -15px;
    }

    > header div {
        display: flex;
    }

    > header div p {
        font-size: 18px;
    }

    @media(max-width: 770px) {
        width: 100%;
        height: auto;

        > header h1 {
            font-size: 24px;

            img {
                width: 20px;
                height: 20px;
            }
        }

        > header p,
        > footer span {
            font-size: 14px;
        }
    }
`