import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PersonalDetails from './pages/PersonalDetails';
import EmploymentDetails from './pages/EmploymentDetails';
import IncomeDetails from './pages/IncomeDetails';
import AppRoutes from './routes/AppRoutes'
import FormProvider from './context/FormContext'; 
import NotFound from './pages/NotFound';
import ConnectionTest from './components/ConnectionTest';

function App() {
  return (
    
    <Router>
      <div className='App'>
      <ConnectionTest />
    </div>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/personal-details" component={PersonalDetails} />
            <Route path="/employment-details" component={EmploymentDetails} />
            <Route path="/incomes" component={IncomeDetails} />
            <Route path="/*" element={<NotFound/>} />
            {/* Add other routes similarly */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
