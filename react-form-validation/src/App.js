import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/pages/HomePage';
import Navbar from './components/animination/Navbar';
import RegistrationForm from './components/form component/RegistrationForm';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route to='/' exact component={HomePage} />
          <Route to='/registartion-from' exact component={RegistrationForm} />
          <Route to='/login-from' exact component={HomePage} />
          <Route to='/logout-from' exact component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
