import { Aside } from "../Aside"
import { Content } from "../Content"
import { MainHeader } from "../MainHeader"
import { Grid } from "./style"

type LayoutProps = {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return(
        <Grid>
            <MainHeader />
            <Aside />
            <Content>
                {children}
            </Content>
        </Grid>
    )
}