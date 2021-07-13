import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import { Container } from './styles';

const Dashboard: React.FC = () => {
    const options = [
        { value: 'Teste', label: 'Teste' },
        { value: 'Teste2', label: 'Teste2' },
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#E44C4E">
                <SelectInput options={options} />
            </ContentHeader>
        </Container>
    );
};

export default Dashboard;
