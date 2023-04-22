import styled from "styled-components";

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 48%;
    height: 260px;
    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
`

export const Legend = styled.div<ILegendProps>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 7px;
    
    > div {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 40px;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        background-color: ${props => props.color};
        margin-right: 5px;
    }
`

export const SideLeft = styled.aside`
    padding: 30px 20px;

    > h2 {
        margin-bottom: 20px;
    }
`

export const SideRight = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
`
