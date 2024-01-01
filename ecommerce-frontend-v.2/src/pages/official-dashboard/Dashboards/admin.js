import React, { useEffect, useContext, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AccountCircle, Store, Business, LocalMall, RoomService, ShoppingBasket, Assignment, People } from '@mui/icons-material';
import { UserAuth, AuthContext } from '../../../auth/auth';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {useNavigate} from 'react-router-dom';
const AdminDashboard = () => {
  const { authTokens, apiUrl, logoutUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    customer_count: 0,
    merchant_count: 0,
    business_count: 0,
    product_count: 0,
    service_count: 0,
    product_total_orders: 0,
    service_total_orders: 0,
    customer_with_orders: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const[links,setLink] =useState('')
  const  navigate=useNavigate()

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${authTokens.access}`  },
    };
    fetch(`${apiUrl}/api/admin-report/`, requestOptions)
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

  const handleDialogOpen = (text,location) => {
    setDialogText(text);
    setOpenDialog(true);
    setLink(location);
  };
  const handleLocation=()=>{
    navigate(links);

  }

  // Function to handle closing the dialog box
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
     // Replace with your desired primary color
    // Replace with your desired text color
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add elevation (shadow)
    borderRadius: 8,
    height: '150px', // Set a fixed height, or use percentage value for responsive height
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
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Customers','/dashboard/customers')}>
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
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Merchants','/dashboard/merchants')}>
          <Store style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Merchants
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.merchant_count}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Busineses','/dashboard/businesses')}>
          <Business style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Businesses
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.business_count}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to  Products','/dashboard/products')}>
          <LocalMall style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Products
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.product_count}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Services','/dashboard/services')}>
          <RoomService style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Services
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.service_count}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Product Orders','/dashboard/product_orders')}>
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
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Service Ordes','/dashboard/service_orders')} >
          <SupportAgentIcon style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Service Total Orders
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.service_total_orders}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyles} >
          <SupportAgentIcon style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Customer With Orders
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.customer_with_orders}
          </Typography>
        </Card>
      </Grid>
      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogText}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDialogClose} >
           Cancel
          </Button>
          <Button onClick={handleLocation} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add other Grid items similarly */}
    </Grid>
  );
};

export default AdminDashboard;
