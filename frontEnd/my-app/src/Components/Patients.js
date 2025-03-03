import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Patient = () => {
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    allergies: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/api/patients",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Patient added successfully!");
      setFormData({ name: "", roomNumber: "", allergies: [] });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add patient. Check console for details.");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Room Number"
                type="number"
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Allergies</InputLabel>
                <Select
                  multiple
                  value={formData.allergies}
                  onChange={(e) =>
                    setFormData({ ...formData, allergies: e.target.value })
                  }
                >
                  <MenuItem value="nuts">Nuts</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                  <MenuItem value="gluten">Gluten</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": { backgroundColor: "#1e88e5" },
                }}
              >
                Add Patient
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Patient;
