import { Container, Typography, Grid2, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Patients from '../Components/Patients';
import DietChartForm from '../Components/DietChartForm';

const Manager = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Mahi', room: '101', diet: 'Low Sodium', status: 'Pending' },
    { id: 2, name: 'Aman', room: '102', diet: 'High Protein', status: 'Approved' },
  ]);

  const handleUpdateDiet = (patientId, newDiet) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === patientId ? { ...patient, diet: newDiet } : patient
      )
    );
  };

  const columns = [
    { field: 'name', headerName: 'Patient Name', width: 200 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'diet', headerName: 'Diet Plan', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 4, mb: 2, fontWeight: 'bold' }}>
        Hospital Food Manager Dashboard
      </Typography>

      <Grid2 container spacing={3}>
        {/* Patients Section */}
        <Grid2 item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Patients</Typography>
              <Patients />
            </CardContent>
          </Card>
        </Grid2>

        {/* Diet Chart Form */}
        <Grid2 item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Update Diet Plan</Typography>
              <DietChartForm onUpdateDiet={handleUpdateDiet} />
            </CardContent>
          </Card>
        </Grid2>

        {/* Data Table */}
        <Grid2 item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 3, p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Patients Diet Chart
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={patients}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    fontSize: 16,
                  },
                  '& .MuiDataGrid-row:nth-of-type(even)': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              />
            </div>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Manager;
