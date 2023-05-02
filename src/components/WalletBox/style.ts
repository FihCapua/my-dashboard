import styled from "styled-components";

export const Container = styled.div`
    width: 32%;
    height: 150px;
    margin: 10px 0;
    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    padding: 10px 20px;

    position: relative;
    overflow: hidden;
    
    img {
        height: 110%;
        position: absolute;
        opacity: 0.3;

        top: -5%;
        right: -20px;
    }

    span {
        font-weight: bold;
        font-size: 35px;
    }

    > small {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }

    @media (max-width: 770px) {
        > section > span {
            font-size: 20px;
            margin-top: 10px;
        }

        > section > h1 {
            word-wrap: break-word;
            font-size: 20px; 
        }

        > section > h1 > span {
            font-size: 22px;
        }
    }

    @media (max-width: 500px) {
        width: 100%;

        > section {
            margin-top: 30px;
        }
    }
`