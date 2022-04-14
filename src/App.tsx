import './App.scss';

import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './auth/protected-route';
import { setAccessToken } from './services/axiosAPI';
import { AlbumsView } from './views/albums';
import { AlbumsDetailsView } from './views/albums-detail';
import { ImageDetailsView } from './views/image-details';
import { MainView } from './views/main';
import Profile from './views/profile';

function App() {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [isGettingToken, setIsGettingToken] = useState(false);

  useEffect(() => {
    async function getAndSaveToken() {
      if (isAuthenticated) {
        // console.log('authenticated, getting token');
        setIsGettingToken(true);
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        setIsGettingToken(false);
      }
    }

    getAndSaveToken();
  }, [isAuthenticated, getAccessTokenSilently, isLoading]);

  if (isLoading || isGettingToken) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Switch>
        <Route exact path='/' component={MainView} />
        <Route exact path='/image/:id/:secret' component={ImageDetailsView} />
        <ProtectedRoute exact path='/albums' component={AlbumsView} />
        <Route exact path='/album/:id' component={AlbumsDetailsView} />
        <ProtectedRoute exact path='/profile' component={Profile} />
      </Switch>
    </>
  );
}

export default App;
