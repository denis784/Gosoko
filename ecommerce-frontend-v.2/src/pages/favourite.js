import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AuthContext } from '../auth/auth';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#f1f1f1'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    marginRight: theme.spacing(2),
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  quantityButton: {
    minWidth: '24px',
    padding: 0,
  },
  quantityText: {
    margin: '0px 8px',
  },
  totalValue: {
    textAlign: 'right',
    padding: '8px',
  },
  checkoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    marginTop: '16px',
    float: 'right',
  },
  checkoutCard: {
    position: 'sticky',
    top: theme.spacing(3),
  },
  cardContent: {
    padding: theme.spacing(2),
  },
}));

function FavouritePage() {
  const { favoritesList,setFavoritesList} = useContext(AuthContext);
  const classes = useStyles();

  const updateQuantity = (itemId, newQuantity) => {
    let updatedFavoritesList = favoritesList.map((item) => {
      if (item.product_serial === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item) => item.quantity > 0);
  
    // Remove the item from local storage if the quantity is less than or equal to 0
    if (newQuantity <= 0) {
      updatedFavoritesList = updatedFavoritesList.filter(
        (item) => item.product_serial !== itemId
      );
    }
  
    setFavoritesList(updatedFavoritesList);
  
    // Update the favoritesList in local storage
    localStorage.setItem("favoritesList", JSON.stringify(updatedFavoritesList));
  };
  
  

  const cartTotal =  favoritesList.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  if (favoritesList.length === 0) {
    return <div  style={{ width: '100%', height: '250px' ,backgroundColor: '#f1f1f1', }}>Your wishlist is empty.</div>;
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          { favoritesList.map((item) => (
            <Paper className={classes.paper} spacing={2} key={item.product_serial}>
              <Grid container alignItems="center">
                <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                  <Box className={classes.image}>
                  <Link
                    to={`/products/${item.app_name}/${item.category.name}/${item.subcategory.name}/${item.type.name}/${item.product_serial}`}
                    >
                    <img
                        className={classes.img}
                        alt="item"
                        src={item.image1}
                        srcSet={`Ksh  {item.image1} 1x, Ksh  {item.image2} 2x`}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 33vw, 300px"
                    />
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={10}>
                  <Grid item xs={10}>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={3} style={{ width: '600px' }}>
                        <Box>
                          <h3>{item.title}</h3>
                        </Box>
                        
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                          <Box>Price: Ksh  {parseFloat(item.price).toFixed(2)}</Box>
                          
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.checkoutCard}>
            <CardContent className={classes.cardContent}>
              <h2>JI KONNECT</h2>
              
                <Box >
                  <span>
                    WISHLIST
                  </span>
                  <Box textAlign="right">
                
                  </Box>
                </Box>
            
              <hr />
              <Box>
                <strong></strong>
                <Box textAlign="right">
                  
                </Box>
              </Box>
              <Button className={classes.checkoutButton}></Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default FavouritePage;  

  