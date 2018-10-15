import React from 'react'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
// import purple from '@material-ui/core/colors/purple'
// import green from '@material-ui/core/colors/green'
// import grey from "@material-ui/core/colors/grey"
import pink from "@material-ui/core/colors/pink"
// import teal from "@material-ui/core/colors/teal"
import cyan from "@material-ui/core/colors/cyan"
// import blueGrey from "@material-ui/core/colors/blueGrey"
// import deepPurple from "@material-ui/core/colors/deepPurple"
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
        secondary: {
            ligth: pink[300],
            main: pink[700],
            dark: pink[900]
        },

        primary: {
            ligth: cyan[300],
            main: cyan[900],
            dark: cyan[1100]
        }
    }
})

function withRoot(Component) {
    function WithRoot(props) {

        return(
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        )
    }

    return WithRoot;
}

export default withRoot;