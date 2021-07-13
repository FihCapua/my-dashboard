import styled from 'styled-components';
import Switch, { SwitchProps } from '@material-ui/core/Switch';

export const Container = styled.div`
    display: flex;
`;

export const ToggleLabel = styled.span`
    color: ${(props) => props.theme.colors.white};
    display: flex;
    align-items: center;
`;

export const ToggleSelector = styled(Switch).attrs<SwitchProps>()<SwitchProps>`
    // ({ theme }) => ({
    //     onColor: theme.colors.info,
    //     offColor: theme.colors.warning,
    // })
    margin: 0 7px;
`;
