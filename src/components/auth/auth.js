import React, {Component} from 'react'
import qs from 'qs';

class Auth extends Component {

    render() {

        if(this.props.isAuthenticated) {
            this.props.history.push("/");
        }

        const {search} = this.props.location;
        if(search !== '') {
            const token = qs.parse( search, { ignoreQueryPrefix: true });
            // this.removeQuery('access_token');
            this.props.handleLogin(token.access_token);
            this.props.history.push("/login")
        }

        if(this.props.isLoading) {
            return (<h3>Loading....</h3>)
        }

        
        return (
            <div className="auth">
                {/* <SocialLoginButton
                    autoCleanUri
                    provider='github'
                    gatekeeper='http://localhost:9999'
                    appId='4058de8a2150057cfa2d'
                    // appId='35926684758-qlpdr5fkn3kck6sd7ut2i652is648r2s.apps.googleusercontent.com'
                    redirect='http://localhost:9000/user/signin/callback/'
                   // getInstance={this
                    // .setNodeRef
                    // .bind(this, 'github')}
                    key={'github'}
                    >
                    Login with GitHub OAuth
                </SocialLoginButton> */}
            
                <a href="https://github.com/login/oauth/authorize?client_id=4058de8a2150057cfa2d&scope=gist" className="btn btn-primary">Login with GitHub OAuth</a>
            </div>
        )
    }
}

export default Auth;