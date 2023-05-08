import styled, {keyframes} from "styled-components";

interface ILegendProps {
  color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(100px);
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
  min-height: 260px;
  display: flex;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 7px;

  animation: ${animate} 0.5s;

  @media (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  > h2 {
    padding-left: 16px;
    margin-bottom: 10px;
  }
`;

export const Legend = styled.div<ILegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;

  > div {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: ${(props) => props.color};
    align-items: center;
    margin-right: 5px;
    margin-left: 16px;
  }

  @media (max-width: 1200px) {
    > div {
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 12px;
      line-height: 30px;
    }

    > span {
      font-size: 12px;
      margin-left: 10px;
    }
  }
`;

export const SideRight = styled.main`
  display: flex;
  justify-content: center;
  flex: 1;
  min-height: 150px;
  padding-top: 35px;
`;
