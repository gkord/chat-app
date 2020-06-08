import React, { useEffect } from 'react';
import GlobalStyles from './utils/GlobalStyles';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Messenger from './containers/Messenger';
import LandingPage from './containers/LandingPage';
import AuthRoute from './components/Auth';
import Container from './components/elements/Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import checkAuth from './utils/checkAuth';
import store from './store/store';

const App = () => {
  useEffect(() => {
    checkAuth(store);
  }, []);

  return (
    <div>
      <Router>
        <GlobalStyles />
        <Container>
          <NavBar />
          <Route exact path='/' component={LandingPage} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <AuthRoute path='/messenger' component={Messenger} />
        </Container>
      </Router>
    </div>
  );
};

export default App;
