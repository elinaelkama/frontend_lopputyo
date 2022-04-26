import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  BrowserRouter,  Routes,  Route,  Link} from"react-router-dom"
import Customer from ".//components/Customer.js"
import Trainings from ".//components/Trainings.js"

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Training Centre
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Link to="/customers">Customer</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Routes>
          <Route path="/customers"element={<Customer />} />
          <Route path="/trainings"element={<Trainings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
