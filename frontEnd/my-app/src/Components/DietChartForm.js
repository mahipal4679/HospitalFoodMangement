import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const DietChartForm = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: "",
    morning: { ingredients: [], instructions: "" },
    evening: { ingredients: [], instructions: "" },
    night: { ingredients: [], instructions: "" },
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/patients");
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleMealChange = (mealType, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [mealType]: {
        ...prevState[mealType],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/diet-charts", formData);
      alert("Diet chart created successfully!");

      setFormData({
        patient: "",
        morning: { ingredients: [], instructions: "" },
        evening: { ingredients: [], instructions: "" },
        night: { ingredients: [], instructions: "" },
      });
    } catch (error) {
      console.error(
        "Error creating diet chart:",
        error.response?.data || error.message
      );
      alert("Failed to create diet chart. Please try again.");
    }
  };

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Create Diet Chart
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Patient Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Patient</InputLabel>
                <Select
                  value={formData.patient}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patient: e.target.value }))
                  }
                  required
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient._id} value={patient._id}>
                      {patient.name} (Room: {patient.roomNumber})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Meal Sections */}
            {["morning", "evening", "night"].map((mealType) => (
              <Grid item xs={12} md={4} key={mealType}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                    gutterBottom
                  >
                    {mealType} Meal
                  </Typography>

                  <TextField
                    fullWidth
                    label="Ingredients (comma separated)"
                    value={formData[mealType].ingredients.join(", ")}
                    onChange={(e) =>
                      handleMealChange(
                        mealType,
                        "ingredients",
                        e.target.value.split(",").map((item) => item.trim())
                      )
                    }
                    margin="normal"
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Special Instructions"
                    value={formData[mealType].instructions}
                    onChange={(e) =>
                      handleMealChange(mealType, "instructions", e.target.value)
                    }
                    margin="normal"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Card>
              </Grid>
            ))}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
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
                Save Diet Chart
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default DietChartForm;
