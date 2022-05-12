import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  BrowserRouter,  Routes,  Route,  Link} from"react-router-dom"
import Customer from ".//components/Customer.js"
import Trainings from ".//components/Trainings.js"
import Calendar from ".//components/Calendar.js"

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Link to="/customers">Customer</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Link to="/calendar">Calendar</Link>{' '}
        <Routes>
          <Route path="/customers"element={<Customer />} />
          <Route path="/trainings"element={<Trainings />} />
          <Route path="/calendar"element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
