import { Container } from "./style"

type ContentProps = {
    children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
    return(
        <Container>
            {children}
        </Container>
    )
}