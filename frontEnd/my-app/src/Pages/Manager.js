import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Patients from "../Components/Patients";
import DietChartForm from "../Components/DietChartForm";

const Manager = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/patients");

        const formattedPatients = data.map((patient) => ({
          id: patient._id,
          name: patient.name,
          room: patient.roomNumber,
          allergies: patient.allergies[0] || "Not Assigned",
          morning: patient?.dietChart?.morning?.instructions || "None",
          evening: patient?.dietChart?.evening?.instructions || "None",
          night: patient?.dietChart?.night?.instructions || "None",
          status: patient.status || "Pending",
        }));
        setPatients(formattedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleUpdateDiet = (patientId, newDiet) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, diet: newDiet } : patient
      )
    );
  };

  const columns = [
    { field: "name", headerName: "Patient Name", width: 140 },
    { field: "room", headerName: "Room", width: 100 },
    { field: "allergies", headerName: "Allergies", width: 140 },
    { field: "morning", headerName: "Morning Plan", width: 140 },
    { field: "evening", headerName: "Evening Plan", width: 140 },
    { field: "night", headerName: "Night Plan", width: 140 },
    { field: "status", headerName: "Status", width: 140 },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 30%, #bbdefb 90%)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#0d47a1",
            textShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            mb: 4,
          }}
        >
          Hospital Food Manager Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Patients List */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 6, borderRadius: 3, backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#1e88e5" }}
                >
                  Patients
                </Typography>
                <Patients patients={patients} />
              </CardContent>
            </Card>
          </Grid>

          {/* Diet Plan Update Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 6, borderRadius: 3, backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#1e88e5" }}
                >
                  Update Diet Plan
                </Typography>
                <DietChartForm onUpdateDiet={handleUpdateDiet} />
              </CardContent>
            </Card>
          </Grid>

          {/* Patients Diet Chart */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 6, borderRadius: 3, p: 3, backgroundColor: "#ffffff" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1e88e5", mb: 2 }}
              >
                Patients Diet Chart
              </Typography>
              <Box sx={{ height: 450, width: "100%" }}>
                <DataGrid
                  rows={patients}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#1e88e5",
                      color: "#ggg",
                      fontSize: 16,
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-row:nth-of-type(even)": {
                      backgroundColor: "#f1f8ff",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                    "& .MuiDataGrid-cell": {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Manager;
