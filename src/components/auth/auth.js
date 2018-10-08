import React, { Component } from 'react'
import qs from 'qs';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


class Auth extends Component {



    render() {

        const { isAuthenticated, isLoading, location, handleLogin, history } = this.props;
        if (isAuthenticated) {
            history.push("/");
        }

        const { search } = location;
        if (search !== '') {
            const token = qs.parse(search, { ignoreQueryPrefix: true });
            // this.removeQuery('access_token');
            handleLogin(token.access_token);
            history.push("/login")
        }

        const API_URL = "https://github.com/login/oauth/authorize?client_id=4058de8a2150057cfa2d&scope=gist"

        return (
            <div className="auth text-center pt-5">
                {
                    isLoading ?
                    <React.Fragment>
                        <CircularProgress size={50} />
                        <Typography variant="display1" className="mt-3">Loading...</Typography>
                    </React.Fragment> :

                    <Button variant="contained" color="secondary">
                        <a style={{textDecoration: 'none', color: '#fff'}} href={API_URL}>Login with GitHub OAuth</a>
                    </Button>
                }

            </div>
        )
    }
}

export default Auth;