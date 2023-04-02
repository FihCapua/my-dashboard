import { Aside } from "../Aside"
import { Content } from "../Content"
import { MainHeader } from "../MainHeader"
import { Grid } from "./style"

export const Layout: React.FC = () => {
    return(
        <Grid>
            <MainHeader />
            <Aside />
            <Content />
        </Grid>
    )
}