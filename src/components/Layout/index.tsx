import React from 'react';
import { Aside } from "../Aside"
import { Content } from "../Content"
import { MainHeader } from "../MainHeader"
import { Grid } from "./style"

interface ILayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
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