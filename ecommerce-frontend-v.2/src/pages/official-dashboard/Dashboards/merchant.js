import React, { useEffect, useContext, useState } from 'react';

import { Grid, Card,  Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { AccountCircle, Store, Business, LocalMall, RoomService, ShoppingBasket} from '@mui/icons-material';
import { UserAuth, AuthContext } from '../../../auth/auth';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import  {useNavigate} from 'react-router-dom'; 
const MerchantDashboard = () => {
  const { authTokens, apiUrl, logoutUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    business_count: 0,
    product_count: 0,
    service_count: 0,
    product_total_orders: 0,
    service_total_orders: 0,
    customer_count: 0,
    
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [links, setLink] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${authTokens.access}`  },
    };
    fetch(`${apiUrl}/api/merchant-report/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setData(data); // Set the retrieved data
            console.log('fresh data for business', data);
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else if (response.status === 404) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
  // Function to handle opening the dialog box and setting the dialog text
  const handleDialogOpen = (text, location) => {
    setDialogText(text);
    setOpenDialog(true);
    setLink(location);
  };

  // Function to handle confirming the action in the dialog box
  const handleConfirmAction = () => {
    // Perform the action you want to take here, for example, navigate to the specified link
    navigate(links);
    // Close the dialog box
    setOpenDialog(false);
  };

  // Function to handle closing the dialog box without taking action
  const handleCancelAction = () => {
    setOpenDialog(false);
  };


  const cardStyles = {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    height: '150px',
    position: 'relative',
  };


  const iconStyles = {
    position: 'absolute',
    
    color: 'rgb(47, 226, 80)',
    top: 8,
    left: 8,
    fontSize: 40, // Adjust the size of the icon as needed
  };

  const headingStyles = {
    textAlign: 'center',
     // Use "auto" to push the heading to the top-center
    marginBottom: 'auto', // Use "auto" to push the heading to the top-center
  };

  const valueStyles = {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 18, // Adjust the font size of the value
    fontWeight: 'bold',
  };

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} >
          <AccountCircle style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Customers
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.customer_count}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed To Business Page ', '/dashboard/businesses')}>
          <Store style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Businesses
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.business_count}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed  to Products', '/dashboard/products&services')}>
          <LocalMall style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Products || Services
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.product_count + data.service_count}
          </Typography>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed To Product Orders', '/dashboard/product_orders')}>
          <ShoppingBasket style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Product Orders
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.product_total_orders}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed  To Service Total Orders', '/dashboard/service_orders')}>
          <SupportAgentIcon style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Service  Orders
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.service_total_orders}
          </Typography>
        </Card>
      </Grid>
  
      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleCancelAction}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogText}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCancelAction}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
  
};

export default MerchantDashboard;
