import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/pages/HomePage';
import Navbar from './components/animination/Navbar';
import RegistrationForm from './components/forms/RegistrationForm';


function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/home' exact component={HomePage} />
            <Route path='/registartion-from' exact component={RegistrationForm} />
            <Route path='/login-from' exact component={RegistrationForm} />
            <Route path='/logout-from' exact component={RegistrationForm} />
<Route path='/add-update' exact component={AddEditUpdateMaterial} />
            
          </Switch>
        </div> 
      </Router>
    </div>
  );
}

export default App;
