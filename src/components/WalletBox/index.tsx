import React, { useMemo } from 'react';
import CountUp from 'react-countup';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import dollarImg from '../../assets/dollar.svg';
import { Container } from './styles';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    icon: 'dollar' | 'arrowUp' | 'arrowDown';
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    icon,
    color,
}) => {
    const iconSelected = useMemo(() => {
        if (icon === 'dollar') {
            return dollarImg;
        }
        if (icon === 'arrowUp') {
            return arrowUpImg;
        }
        if (icon === 'arrowDown') {
            return arrowDownImg;
        }
    }, [icon]); // retorna o icone escolhido
    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp
                    end={amount}
                    prefix={'R$ '}
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{footerlabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    );
};

export default WalletBox;
