import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

function OrderPlacementForm() {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    merchantName: '',
    merchantEmail: '',
    merchantPhone: '',
    productName: '',
    quantity: '',
    deliveryAddress: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send the order details to logistics
    console.log('Order Details:', orderDetails);
    // You can add your logic here to send the order details to logistics
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Order Placement
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                variant="outlined"
                required
                value={orderDetails.customerName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Email"
                name="customerEmail"
                variant="outlined"
                required
                value={orderDetails.customerEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Phone"
                name="customerPhone"
                variant="outlined"
                required
                value={orderDetails.customerPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Merchant Name"
                name="merchantName"
                variant="outlined"
                required
                value={orderDetails.merchantName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Merchant Email"
                name="merchantEmail"
                variant="outlined"
                required
                value={orderDetails.merchantEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Merchant Phone"
                name="merchantPhone"
                variant="outlined"
                required
                value={orderDetails.merchantPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                required
                value={orderDetails.productName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                variant="outlined"
                required
                value={orderDetails.quantity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Delivery Address"
                name="deliveryAddress"
                variant="outlined"
                required
                multiline
                rows={4}
                value={orderDetails.deliveryAddress}
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
                Place Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default OrderPlacementForm;
