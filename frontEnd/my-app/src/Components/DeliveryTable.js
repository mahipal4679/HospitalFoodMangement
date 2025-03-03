import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/deliveries");
        setDeliveries(response.data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const columns = [
    {
      field: "patientName",
      headerName: "Patient",
      width: 180,
      valueGetter: (params) => params.row.patient.name,
    },
    {
      field: "roomNumber",
      headerName: "Room",
      width: 100,
      valueGetter: (params) => params.row.patient.roomNumber,
    },
    {
      field: "mealType",
      headerName: "Meal Type",
      width: 150,
      valueGetter: (params) => params.row.mealType.toUpperCase(),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "delivered"
              ? "success"
              : params.value === "preparing"
              ? "warning"
              : "error"
          }
          variant="outlined"
        />
      ),
    },
    {
      field: "deliveryPerson",
      headerName: "Delivery Staff",
      width: 180,
      valueGetter: (params) => params.row.deliveryPerson?.name || "Not assigned",
    },
    {
      field: "timestamp",
      headerName: "Delivery Time",
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <Card sx={{ maxWidth: 1100, mx: "auto", mt: 4, p: 3, boxShadow: 4, borderRadius: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Delivery Tracking
        </Typography>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={deliveries}
            columns={columns}
            loading={loading}
            components={{
              Toolbar: CustomToolbar,
              LoadingOverlay: LinearProgress,
            }}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#f9f9f9",
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
  );
};

export default DeliveryTable;
