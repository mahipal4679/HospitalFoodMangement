import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useState } from 'react';

const DeliveryPerson = () => {
  const [deliveries] = useState([
    { id: 1, patient: 'John Doe', room: '101', status: 'Pending' },
    // Sample data
  ]);

  const handleDeliveryComplete = (deliveryId) => {
    // Update delivery status
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
              onClick={() => handleDeliveryComplete(delivery.id)}
            >
              Mark Delivered
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DeliveryPerson;