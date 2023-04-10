import { ContentHeader } from "../../components/ContentHeader"
import { SelectInput } from "../../components/SelectInput"
import { Container } from "./style"

export const Dashboard: React.FC = () => {

    const options = [
        {value: 'Fiama', label: 'Fiama'},
        {value: 'Teste', label: 'Teste'}
    ]

    return(
        <Container>
            <ContentHeader title="Dashboard" lineColor="#fff">
                <SelectInput options={options} onChange={() => {}} />
            </ContentHeader>
        </Container>
    )
}