import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Messenger from './containers/Messenger';
import AuthRoute from './components/Auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import checkAuth from './utils/checkAuth';
import store from './store/store';

const App = () => {
  useEffect(() => {
    checkAuth(store);
  }, []);

  return (
    <div>
      <Router>
        <NavBar />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <AuthRoute path='/messenger' component={Messenger} />
      </Router>
    </div>
  );
};

export default App;
