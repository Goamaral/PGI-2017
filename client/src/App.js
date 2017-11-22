import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Registration from './views/Registration';

const App = () => (
  <Router>
    <Route path="/" component={Registration}/>
  </Router>
)

export default App;
