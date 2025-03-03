import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useState } from 'react';

const DeliveryPerson = () => {
  const [deliveries, setDeliveries] = useState([
    { id: 1, patient: 'Rahi', room: '101', status: 'Pending' },
    { id: 2, patient: 'Mahi', room: '102', status: 'Pending' },
  ]);

  const handleDeliveryComplete = (deliveryId) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.id === deliveryId ? { ...delivery, status: 'Delivered' } : delivery
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Delivery Dashboard</Typography>
      <List>
        {deliveries.map(delivery => (
          <ListItem key={delivery.id}>
            <ListItemText
              primary={`${delivery.patient} (Room ${delivery.room})`}
              secondary={`Status: ${delivery.status}`}
            />
            <Button
              variant="contained"
              color={delivery.status === "Delivered" ? "success" : "primary"}
              disabled={delivery.status === "Delivered"}
              onClick={() => handleDeliveryComplete(delivery.id)}
            >
              {delivery.status === "Delivered" ? "Delivered" : "Mark Delivered"}
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DeliveryPerson;
