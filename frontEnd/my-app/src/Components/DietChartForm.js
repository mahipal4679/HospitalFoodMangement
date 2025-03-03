import { useState, useEffect } from 'react';
import {
  Grid2, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, Typography
} from '@mui/material';
import axios from 'axios';

const DietChartForm = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: '',
    morning: { ingredients: [], instructions: '' },
    evening: { ingredients: [], instructions: '' },
    night: { ingredients: [], instructions: '' }
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/patients');
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);


  const handleMealChange = (mealType, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [mealType]: {
        ...prevState[mealType],
        [field]: value
      }
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/diet-charts', formData);
      alert('Diet chart created successfully!');


      setFormData({
        patient: '',
        morning: { ingredients: [], instructions: '' },
        evening: { ingredients: [], instructions: '' },
        night: { ingredients: [], instructions: '' }
      });
    } catch (error) {
      console.error('Error creating diet chart:', error.response?.data || error.message);
      alert('Failed to create diet chart. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Create Diet Chart</Typography>

      <Grid2 container spacing={2}>

        <Grid2 item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Patient</InputLabel>
            <Select
              value={formData.patient}
              onChange={e => setFormData(prev => ({ ...prev, patient: e.target.value }))}
              required
            >
              {patients.map(patient => (
                <MenuItem key={patient._id} value={patient._id}>
                  {patient.name} (Room: {patient.roomNumber})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>


        {['morning', 'evening', 'night'].map(mealType => (
          <Grid2 item xs={12} md={4} key={mealType}>
            <Typography variant="subtitle1" gutterBottom>
              {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Meal
            </Typography>

            <TextField
              fullWidth
              label="Ingredients (comma separated)"
              value={formData[mealType].ingredients.join(', ')}
              onChange={e => handleMealChange(
                mealType,
                'ingredients',
                e.target.value.split(',').map(item => item.trim())
              )}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Special Instructions"
              value={formData[mealType].instructions}
              onChange={e => handleMealChange(mealType, 'instructions', e.target.value)}
              margin="normal"
              multiline
              rows={3}
            />
          </Grid2>
        ))}


        <Grid2 item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save Diet Chart
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default DietChartForm;
