import { Container, Typography, Card, CardContent, Chip } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Pantry = () => {
  const [tasks] = useState([
    { id: 1, patient: "Mahi", meal: "Breakfast", status: "Pending" },
    { id: 2, patient: "Mahipal", meal: "Breakfast", status: "Complete" },
    { id: 3, patient: "Rahi", meal: "Breakfast", status: "In-Process" },
  ]);

  const columns = [
    { field: "patient", headerName: "Patient", width: 200 },
    { field: "meal", headerName: "Meal", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Complete"
              ? "success"
              : params.value === "In-Process"
              ? "warning"
              : "error"
          }
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Pantry Management Dashboard
      </Typography>

      <Card sx={{ mt: 3, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Meal Preparation Tasks
          </Typography>

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1976d2",
                  color: "#ggg",
                  fontSize: 16,
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:nth-of-type(even)": {
                  backgroundColor: "#f5f5f5",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#e3f2fd",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: 14,
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Pantry;
