import React from 'react';
import Signup from './components/Signup';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <Signup />
      {/* <Router>
        <Route path='/' component={Login} />
        <Route />
        <Route />
      </Router> */}
    </div>
  );
};

export default App;
