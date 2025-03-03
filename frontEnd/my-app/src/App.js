import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from '../src/Context/AuthContext';
import Manager from '../src/Pages/Manager';
import Pantry from '../src/Pages/Pantry';
import DeliveryPerson from '../src/Pages/DeliveryPerson';
import Login from '../src/Pages/Login';

const theme = createTheme({
  palette: {
    primary: { main: '#1976a2' },
    secondary: { main: '#dc004e' }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/manager" element={
                <Manager/>
            } />
            <Route path="/pantry" element={
                <Pantry/>
            } />
            <Route path="/delivery" element={
                <DeliveryPerson/>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;