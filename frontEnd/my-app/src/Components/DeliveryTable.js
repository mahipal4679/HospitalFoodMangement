import { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton 
} from '@mui/x-data-grid';
import { Chip, LinearProgress } from '@mui/material';
import axios from 'axios';

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('/api/deliveries');
        setDeliveries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const columns = [
    { 
      field: 'patientName', 
      headerName: 'Patient', 
      width: 200,
      valueGetter: (params) => params.row.patient.name
    },
    { 
      field: 'roomNumber', 
      headerName: 'Room', 
      width: 120,
      valueGetter: (params) => params.row.patient.roomNumber
    },
    { 
      field: 'mealType', 
      headerName: 'Meal Type', 
      width: 150,
      valueGetter: (params) => params.row.mealType.toUpperCase()
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'delivered' ? 'success' :
            params.value === 'preparing' ? 'warning' : 'error'
          }
          variant="outlined"
        />
      )
    },
    { 
      field: 'deliveryPerson', 
      headerName: 'Delivery Staff', 
      width: 200,
      valueGetter: (params) => params.row.deliveryPerson?.name || 'Not assigned'
    },
    { 
      field: 'timestamp', 
      headerName: 'Delivery Time', 
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString()
    }
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={deliveries}
        columns={columns}
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress
        }}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DeliveryTable;