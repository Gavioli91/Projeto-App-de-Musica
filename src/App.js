import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './services/Components/Login';
import Search from './services/Components/Search';
import Album from './services/Components/Album';
import Favorites from './services/Components/Favorites';
import Profile from './services/Components/Profile';
import ProfileEdit from './services/Components/ProfileEdit';
import NotFound from './services/Components/NotFound';

class App extends React.Component {
  render() {
    return (
      <main className="pages">
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/not/found" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
