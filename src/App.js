import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './component/Login';
import Search from './component/Search';
import Album from './component/Album';
import Favorites from './component/Favorites';
import Profile from './component/Profile';
import ProfileEdit from './component/ProfileEdit';
import NotFound from './component/NotFound';
import Loading from './component/Loading';

class App extends React.Component {
  render() {
    return (
      <main className="pages">
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route component={ NotFound } />
            <Route exact path="loading" component={ Loading } />
            <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
