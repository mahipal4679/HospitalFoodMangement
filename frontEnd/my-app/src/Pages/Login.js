import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(credentials.email, credentials.password);

      if (!user || !user.role) {
        throw new Error("Invalid user data received");
      }
      switch (user.role) {
        case "admin":
          navigate("/manager");
          break;
        case "pantry":
          navigate("/pantry");
          break;
        case "delivery":
          navigate("/delivery");
          break;
        default:
          setError("Unauthorized access");
          localStorage.removeItem("token");
      }
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 30%, #bbdefb 90%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Card sx={{ boxShadow: 6, borderRadius: 3, p: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#1e88e5",
                textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
                mb: 2,
              }}
            >
              Hospital Food Management
            </Typography>

            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, fontWeight: "bold" }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />

              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "#1e88e5",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
