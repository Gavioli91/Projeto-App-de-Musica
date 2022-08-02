import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
    state = { userName: '', loading: false }

    componentDidMount() {
      this.getName();
    }

    getName = async () => {
      this.setState({ loading: true });
      const usuario = await getUser();
      this.setState({ userName: usuario,
        loading: false,
      });
    }

    render() {
      const { userName, loading } = this.state;
      return (
        <header data-testid="header-component">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <p data-testid="header-user-name">
            { loading ? <Loading /> : `${userName.name}` }
          </p>
        </header>
      );
    }
}

export default Header;
