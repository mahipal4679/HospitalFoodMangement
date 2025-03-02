import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Hospital Food System</Typography>
      
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={credentials.email}
          onChange={e => setCredentials({...credentials, email: e.target.value})}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={credentials.password}
          onChange={e => setCredentials({...credentials, password: e.target.value})}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;