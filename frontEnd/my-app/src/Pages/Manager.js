import { useState, useEffect } from 'react';
import { Container, Typography, Grid2, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Patients from '../Components/Patients';
import DietChartForm from '../Components/DietChartForm';

const Manager = () => {
  const [patients, setPatients] = useState([]);

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/patients');
        
        const formattedPatients = data.map(patient => ({
          id: patient._id,
          name: patient.name,
          room: patient.roomNumber,
          allergies: patient.allergies[0] || 'Not Assigned',
          morning: patient?.dietChart?.morning?.instructions || 'NON',
          evening: patient?.dietChart?.evening?.instructions || 'NON',
          night: patient?.dietChart?.night?.instructions || 'NON',
          status: patient.status || 'Pending'
        }));
        setPatients(formattedPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  
  const handleUpdateDiet = (patientId, newDiet) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === patientId ? { ...patient, diet: newDiet } : patient
      )
    );
  };

  const columns = [
    { field: 'name', headerName: 'Patient Name', width: 100 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'allergies', headerName: 'allergies', width: 100 },
    { field: 'morning', headerName: 'morning Plan', width: 100 },
    { field: 'evening', headerName: 'evening Plan', width: 100 },
    { field: 'night', headerName: 'night Plan', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 4, mb: 2, fontWeight: 'bold' }}>
        Hospital Food Manager Dashboard
      </Typography>

      <Grid2 container spacing={3}>
        
        <Grid2 item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Patients</Typography>
              <Patients patients={patients} />
            </CardContent>
          </Card>
        </Grid2>

        
        <Grid2 item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Update Diet Plan</Typography>
              <DietChartForm onUpdateDiet={handleUpdateDiet} />
            </CardContent>
          </Card>
        </Grid2>

    
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
                    color: '#aaa',
                    fontSize: 16
                  },
                  '& .MuiDataGrid-row:nth-of-type(even)': {
                    backgroundColor: '#f5f5f5'
                  }
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
