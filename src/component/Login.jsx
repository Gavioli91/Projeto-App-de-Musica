import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const THREE_CHARACTERS = 3;

class Login extends React.Component {
  state = { userName: '', btnDisabled: true };

  userInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { userName } = this.state;
      if (userName.length >= THREE_CHARACTERS) {
        this.setState({ btnDisabled: false });
      }
    });
  };

  clickBtn = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    history.push('/loading');
    await createUser({ name: userName });
    history.push('/search');
  };

  render() {
    const { userName, btnDisabled } = this.state;

    return (
      <form>
        <div data-testid="page-login">
          <input
            type="text"
            id="login"
            name="userName"
            data-testid="login-name-input"
            value={ userName }
            onChange={ this.userInput }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ btnDisabled }
            onClick={ this.clickBtn }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Login;
