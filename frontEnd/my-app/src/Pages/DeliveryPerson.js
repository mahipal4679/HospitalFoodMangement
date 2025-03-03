import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useState } from "react";

const DeliveryPerson = () => {
  const [deliveries, setDeliveries] = useState([
    { id: 1, patient: "Rahi", room: "101", status: "Pending" },
    { id: 2, patient: "Mahi", room: "102", status: "Pending" },
  ]);

  const handleDeliveryComplete = (deliveryId) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId ? { ...delivery, status: "Delivered" } : delivery
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Delivery Dashboard
      </Typography>

      <List>
        {deliveries.map((delivery) => (
          <Card
            key={delivery.id}
            sx={{
              mb: 2,
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: delivery.status === "Delivered" ? "#e8f5e9" : "#f3f4f6",
            }}
          >
            <CardContent>
              <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {delivery.patient} (Room {delivery.room})
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: delivery.status === "Delivered" ? "green" : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      Status: {delivery.status}
                    </Typography>
                  }
                />
                <Box>
                  <Button
                    variant="contained"
                    color={delivery.status === "Delivered" ? "success" : "primary"}
                    disabled={delivery.status === "Delivered"}
                    onClick={() => handleDeliveryComplete(delivery.id)}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:disabled": {
                        backgroundColor: "#4caf50",
                        color: "white",
                      },
                    }}
                  >
                    {delivery.status === "Delivered" ? "Delivered" : "Mark Delivered"}
                  </Button>
                </Box>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default DeliveryPerson;
