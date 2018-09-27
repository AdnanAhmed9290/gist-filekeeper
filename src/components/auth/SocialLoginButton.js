import React from 'react';
import PropTypes from 'prop-types';
import SocialLogin from 'react-social-login';

class SocialLoginButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <button className="btn btn-default" onClick={triggerLogin} {...props}>
        {children}
      </button>
    );
  }
}

SocialLoginButton.propTypes = {
  children: PropTypes.any.isRequired,
  triggerLogin: PropTypes.func.isRequired,
};

export default SocialLogin(SocialLoginButton);