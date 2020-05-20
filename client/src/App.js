import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' component={Login} />
        <Route />
        <Route />
      </Router>
    </div>
  );
};

export default App;
