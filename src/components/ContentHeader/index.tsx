import { Container, Controllers, TitleContainer } from "./style"

interface IContentHeaderProps {
    title: string;
    lineColor: string;
    children: React.ReactNode
}

export const ContentHeader: React.FC<IContentHeaderProps> = ({
    title,
    lineColor,
    children
}) => {

    return(
        <Container>
            <TitleContainer lineColor={lineColor}>
                <h1>{title}</h1>
            </TitleContainer>

            <Controllers>
                {children}
            </Controllers>
        </Container>
    )
}