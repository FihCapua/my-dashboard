import styled, {keyframes} from "styled-components";

interface ILegendProps {
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

export const Container = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;
  border-radius: 7px;

  animation: ${animate} 0.5s;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > h2 {
    margin-bottom: 20px;
    padding-left: 16px;
  }

  @media(max-width: 1200px) {
    flex-direction: column;
  }
`;

export const LegendContainer = styled.ul`
  display: flex;
  list-style: none;
  padding-right: 18px;
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 7px;
  margin-left: 7px;

  > span {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: ${(props) => props.color};
    margin-right: 5px;
  }

  @media(max-width: 1200px) {
    > div {
      width: 30px;
      height: 30px;
    }
  }
`;
