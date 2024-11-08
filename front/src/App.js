import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PersonalDetails from './pages/PersonalDetails';
import EmploymentDetails from './pages/EmploymentDetails';
import IncomeDetails from './pages/IncomeDetails';
import AppRoutes from './routes/AppRoutes'
import FormProvider from './context/FormContext'; 

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path="/personal-details" component={PersonalDetails} />
            <Route path="/employment-details" component={EmploymentDetails} />
            <Route path="/incomes" component={IncomeDetails} />
            {/* Add other routes similarly */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
