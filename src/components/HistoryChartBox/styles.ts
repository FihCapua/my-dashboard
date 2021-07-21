import styled from 'styled-components';

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 100%;
    height: 340px;
    margin: 10px 0;
    padding: 30px 20px 50px 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.tertiary};
    color: ${(props) => props.theme.colors.white};
`;

export const ChartHeader = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;

    > h2 {
        padding-left: 15px;
        margin-bottom: 10px;
    }
`;

export const SubtitleContainer = styled.ul`
    display: flex;
    margin: 0 15px;
    list-style: none;
`;

export const Subtitle = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;

    > div {
        background-color: ${(props) => props.color};

        width: 30px;
        height: 30px;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
    }

    > span {
        margin: 0 10px;
    }
`;
