import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {

      const user = await login(credentials.email, credentials.password);

      if (!user || !user.role) {
        throw new Error('Invalid user data received');
      }
      switch (user.role) {
        case 'admin':
          navigate('/manager');
          break;
        case 'pantry':
          navigate('/pantry');
          break;
        case 'delivery':
          navigate('/delivery');
          break;
        default:
          setError('Unauthorized access');
          localStorage.removeItem('token');
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };
  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Hospital Food Management System
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom align="center">
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Email"
          type="email"
          margin="normal"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />

        <TextField
          fullWidth
          required
          label="Password"
          type="password"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;