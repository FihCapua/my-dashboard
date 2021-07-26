import styled from 'styled-components';

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    display: flex;
    width: 48%;
    min-height: 260px;
    margin: 10px 0;
    border-radius: 10px;

    background-color: ${(props) => props.theme.colors.tertiary};
    color: ${(props) => props.theme.colors.white};
`;

export const SideLeft = styled.aside`
    padding: 30px 20px;

    > h2 {
        margin-bottom: 10px;
        padding-left: 16px;
    }
`;

export const SubtitleContainers = styled.ul`
    list-style: none;
    height: 175px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.colors.tertiary};
        border-radius: 10px;
    }
`;

export const Subtitles = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    padding-left: 16px;

    > div {
        background-color: ${(props) => props.color};

        width: 50px;
        height: 50px;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
    }

    > span {
        margin-left: 5px;
    }
`;

export const SideRight = styled.main`
    flex: 1;
    margin-top: 110px;
    height: 150px;
`;
