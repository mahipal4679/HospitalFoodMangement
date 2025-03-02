import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid2, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Patient = () => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    allergies: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/patients', formData);
      // Handle success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Patient Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Room Number"
            value={formData.roomNumber}
            onChange={e => setFormData({...formData, roomNumber: e.target.value})}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Allergies</InputLabel>
            <Select
              multiple
              value={formData.allergies}
              onChange={e => setFormData({...formData, allergies: e.target.value})}
            >
              <MenuItem value="nuts">Nuts</MenuItem>
              <MenuItem value="dairy">Dairy</MenuItem>
              <MenuItem value="gluten">Gluten</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 item xs={12}>
          <Button type="submit" variant="contained">Add Patient</Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default Patient;