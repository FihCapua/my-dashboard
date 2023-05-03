import styled from "styled-components";

interface ILegendProps {
  color: string;
}

export const Container = styled.div`
  width: 48%;
  height: 260px;
  margin: 10px 0;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 7px;
  display: flex;

  @media (max-width: 770px) {
    display: flex;
    width: 100%;
  }
`;

export const Legend = styled.div<ILegendProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 7px;

  > div {
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

  @media (max-width: 1345px) {
    
    flex-wrap: nowrap;

    > div {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
  }
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  > h2 {
    margin-bottom: 20px;
  }

  @media (max-width: 1345px) {
    padding: 0 15px 5px;
    margin-bottom: 15px;

    > h2 {
      margin-top: 15px;
      margin-bottom: 7px;
    }
  }

  @media (max-width: 420px) {
    padding: 15px;
    margin-bottom: 7px;
  }
`;

export const SideRight = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
`;
