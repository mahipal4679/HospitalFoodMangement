import { Container, Typography, Grid2} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';
import Patients from '../Components/Patients';
import DietChartForm from '../Components/DietChartForm';

const Manager = () => {
  const [patients] = useState([
    { id: 1, name: 'John', room: '101', diet: 'Low Sodium' },
    // Sample data
  ]);

  const columns = [
    { field: 'name', headerName: 'Patient Name', width: 200 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'diet', headerName: 'Diet Plan', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Hospital Food Manager Dashboard</Typography>
      
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} md={6}>
          <Patients/>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <DietChartForm/>
        </Grid2>
        <Grid2 item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={patients}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Manager;