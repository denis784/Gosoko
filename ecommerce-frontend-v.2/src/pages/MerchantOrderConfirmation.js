import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

function MerchantOrderConfirmation() {
  const [confirmationData, setConfirmationData] = useState({
    orderNumber: '',
    confirmationMessage: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfirmationData({ ...confirmationData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send the confirmation to the customer
    console.log('Confirmation Data:', confirmationData);
    // You can add your logic here to send the confirmation to the customer
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Order Confirmation
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Order Number"
                name="orderNumber"
                variant="outlined"
                required
                value={confirmationData.orderNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmation Message"
                name="confirmationMessage"
                variant="outlined"
                multiline
                rows={4}
                required
                value={confirmationData.confirmationMessage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Send Confirmation
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default MerchantOrderConfirmation;
