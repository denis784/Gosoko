import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Divider, Button, TextField, Box } from '@mui/material';
import { FaTruck, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import Material-UI icons

function OrderStatus() {
  const { orderId } = useParams(); // Get the orderId from the URL

  const [orderDetails, setOrderDetails] = useState({});
  const [logisticsStatus, setLogisticsStatus] = useState({});
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Fetch order details and logistics status based on orderId
    // Update state with fetched data
    // This involves making API calls to your backend
  }, [orderId]);

  const handleFeedbackSubmit = () => {
    // Submit feedback to backend
    // This involves making an API call to store feedback
  };

  const getLogisticsIcon = (status) => {
    switch (status) {
      case 'disbursed':
        return <FaTruck />;
      case 'in_transit':
        return <FaShippingFast />;
      case 'delivered':
        return <FaCheckCircle />;
      case 'returned':
        return <FaTimesCircle />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Order Status - #{orderId}
      </Typography>
      <Divider />

      {/* Display order details and payment status */}
      <Typography variant="subtitle1">Order Details</Typography>
      {/* Display order details here */}
      <Divider />

      {/* Display logistics status */}
      <Typography variant="subtitle1">Logistics Status</Typography>
      {/* Display logistics status for each product */}
      {logisticsStatus.products &&
        logisticsStatus.products.map((product, index) => (
          <Box key={index} display="flex" alignItems="center">
            {getLogisticsIcon(product.status)} {/* Display the appropriate icon */}
            <Typography>{product.name}</Typography>
          </Box>
        ))}
      <Divider />

      {/* Feedback section */}
      <Typography variant="subtitle1">Give Feedback</Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Enter your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
          Submit Feedback
        </Button>
      </Box>
    </Container>
  );
}

export default OrderStatus;
