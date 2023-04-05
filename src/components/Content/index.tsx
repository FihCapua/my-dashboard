import { Container } from "./style"

interface IContentProps {
    children: React.ReactNode
}

export const Content: React.FC<IContentProps> = ({ children }) => {
    return(
        <Container>
            {children}
        </Container>
    )
}