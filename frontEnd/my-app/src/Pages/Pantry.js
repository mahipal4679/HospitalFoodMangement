import { Container, Typography, Grid2 } from '@mui/material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Pantry = () => {
  const [tasks] = useState([
    { id: 1, patient: 'John Doe', meal: 'Breakfast', status: 'Pending' },
    { id: 2, patient: 'Mahi', meal: 'Breakfast', status: 'complete' },
    { id: 3, patient: 'Rahi', meal: 'Breakfast', status: 'in-process' },
    // Sample data
  ]);

  const columns = [
    { field: 'patient', headerName: 'Patient', width: 200 },
    { field: 'meal', headerName: 'Meal', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'actions', headerName: 'Actions', width: 150 }
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Pantry Management Dashboard</Typography>
      
      <Grid2 container spacing={3}>
        <Grid2 item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={tasks}
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

export default Pantry;