import React, { useEffect, useContext, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { UserAuth, AuthContext } from '../../../auth/auth';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
const CustomerDashboard = () => {
  const navigate=useNavigate()
  const { authTokens, apiUrl, logoutUser } = useContext(AuthContext);
  
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    product_total_orders: 0,
    service_total_orders: 0,
  });
  
  // Dialog Box State
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const[links,setLink] =useState('')

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' ,Authorization: `Bearer ${authTokens.access}`  },
    };
    fetch(`${apiUrl}/api/customer-report/`, requestOptions)
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
    fontSize: 40,
  };

  const headingStyles = {
    textAlign: 'center',
    marginBottom: 'auto',
  };

  const valueStyles = {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 18,
    fontWeight: 'bold',
  };

  const customStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    minHeight: '50px',
    position: 'relative',
    background: '#f0f0f0',
  };

  const headerButtonStyles = {
    marginTop: 3,
    backgroundColor: 'rgb(47, 226, 80)',
    color: 'white',
  };


  // Function to handle opening the dialog box and setting the dialog text
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

  return (
    <Grid container spacing={1} style={{ minHeight: '70vh' }}>
      {/* Styled Header */}
      <Grid item xs={12}>
        <Card style={customStyles}>
          <Typography variant="h6" component="h2">
            Sell Your Products & Services
          </Typography>
          <Button variant="contained" style={headerButtonStyles} onClick={() => handleDialogOpen('Proceed to create a Business','/dashboard/profile')}>
            Become a Merchant
          </Button>
        </Card>
      </Grid>

      {/* Product Orders Card */}
      <Grid item xs={12} sm={6} md={6}>
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

      {/* Service Total Orders Card */}
      <Grid item xs={12} sm={6} md={6}>
        <Card style={cardStyles} onClick={() => handleDialogOpen('Proceed to Service Ordes','/dashboard/service_orders')}>
          <SupportAgentIcon style={iconStyles} />
          <Typography variant="h6" component="h2" style={headingStyles}>
            Service  Orders
          </Typography>
          <Typography variant="h4" component="p" style={valueStyles}>
            {data.service_total_orders}
          </Typography>
        </Card>
      </Grid>

      {/* Add other Grid items similarly */}

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
    </Grid>
  );
};

export default CustomerDashboard;
