import React from 'react'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
// import purple from '@material-ui/core/colors/purple'
// import green from '@material-ui/core/colors/green'
import grey from "@material-ui/core/colors/grey"
import pink from "@material-ui/core/colors/pink"
// import teal from "@material-ui/core/colors/teal"
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
        secondary: {
            ligth: pink[300],
            main: pink[500],
            dark: pink[700]
        },

        primary: {
            ligth: grey[500],
            main: grey[700],
            dark: grey[900]
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