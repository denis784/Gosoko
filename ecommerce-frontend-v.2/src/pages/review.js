import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { AuthContext,UserAuth } from '../auth/auth';


// /this is the dummy data instead use cartlist  in the react component instead to map
// map the name of the product  the quantity  and price 





export default function Review({
        selectedPlace,
        profileData ,  
        locations   ,     
        selectedCounty,
        selectedSubCounty,
        selectedLocality,
        formData,
        authTokens,
        selectedBranch,
        deliveryOption,
        phoneNumber
}) {
  const {cartList}=React.useContext(AuthContext);
  const addresses = [ selectedLocality, selectedSubCounty, selectedCounty, 'KENYA'];
return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
            <List disablePadding>
            {cartList.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <img src={product.image1} alt={product.title} style={{ maxWidth: '100px' }} />
              <ListItemText primary={product.title} secondary={product.description} />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
          ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cartList.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{profileData.first_name} {profileData.last_name}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
          <Typography gutterBottom>{deliveryOption}</Typography>
          <br/>
          <Typography component="div" gutterBottom>
            <span style={{ fontStyle: 'italic' }}>nearest post office</span>
          </Typography>
          <Typography gutterBottom>{selectedPlace}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>{profileData.first_name} {profileData.last_name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{phoneNumber}</Typography>
                </Grid>
              </React.Fragment>
            
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}