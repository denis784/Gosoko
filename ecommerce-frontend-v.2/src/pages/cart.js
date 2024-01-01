import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { AuthContext,UserAuth } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CustomSnackbar from '../components/snackbar';


const useStyles = makeStyles((theme) => ({
  emptyCartMessage: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
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

function CartPage() {
  const classes = useStyles();
  const auth = UserAuth();
  const navigate = useNavigate();
  const[errors,setErrors]=useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showSecondDialog, setShowSecondDialog] = useState(false);
  const [showThirdDialog, setShowThirdDialog] = useState(false);
  const {
    cartList, 
    setCartList ,
    authTokens,
    apiUrl,
    setMessage,
    setSeverity,
    severity,
    severityForSnackbar,
    setShowSnackbar,
    message,
    showSnackbar,
    handleClose,
    handleClearCart ,
    setDashboardType,
  }=useContext(AuthContext);

  const updateQuantity = (itemId, newQuantity) => {
    let updatedCartList = cartList.map((item) => {
      if (item.product_serial === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    // Remove the item from local storage if the quantity is less than or equal to 0
    if (newQuantity <= 0) {
      updatedCartList = updatedCartList.filter(
        (item) => item.product_serial !== itemId
      );
    }

    setCartList(updatedCartList);

    // Update the cartList in local storage
    localStorage.setItem('cartList', JSON.stringify(updatedCartList));
  };
  const handleProceedToCheckout = () => {
    // Check if the user is authenticated
    if (!auth.user) {
      // User is not authenticated, show login required message
      setMessage('Login Required');
      setSeverity(severityForSnackbar);
      setShowSnackbar(true);
      return; // Exit the function if the user is not authenticated
    }
  
    setShowDialog(true);
  };
  const handleContinueProfile =()=>{
    if (showThirdDialog){
      navigate('/dashboard/profile');
      const successMessage = "Complete your profile  to Place Orders!!"
      setMessage(successMessage);
      setSeverity('error');
      setShowSnackbar(true);
      setDashboardType("Customer");
      setShowThirdDialog(!showThirdDialog);

    }
    
   
   
  };
  

 
  

  const handleConfirmCheckout = (e) => {
    e.preventDefault();
    setErrors({}); 
    console.log(cartList) ;  
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}`},
      body: JSON.stringify(cartList)
    };
  
    fetch(`${apiUrl}/api/product_orders/`, requestOptions)
      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setShowDialog(true);
            const successMessage = Object.values(data).flat().join(', '); // Concatenate all values into a single string
            setMessage(successMessage);
            setSeverity('error');
            setShowSnackbar(true);
            setShowDialog(!showDialog);
            setShowSecondDialog(!showSecondDialog);
            setErrors(data);
          });
        } else if (response.status === 201) {
          return response.json().then(data => {
            const successMessage = Object.values(data).flat().join(', '); // Concatenate all values into a single string
            setMessage(successMessage);
            setSeverity('success');
            setShowSnackbar(true);
            setShowDialog(!showDialog);
            setShowSecondDialog(!showSecondDialog);
            
          });
        } else if (response.status === 424) {
          return response.json().then(data => {
            const successMessage = Object.values(data).flat().join(', '); // Concatenate all values into a single string
            setMessage(successMessage);
            setSeverity('error');
            setShowSnackbar(true);
            setShowDialog(!showDialog);
            setShowThirdDialog(!showThirdDialog);
            // setShowSecondDialog(!showSecondDialog);
            
          });
        } else {
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
  

  const handleCancelCheckout = () => {
    setShowDialog(false);
  };
  const handleContinueOrders =() =>{
    handleClearCart();
    setDashboardType('Customer');
    navigate('/dashboard/product_orders',{ replace: true });

  };
  const handleContinueShopping =()=> {
    handleClearCart();
    navigate('/products',{ replace: true });

  };
  const handleContinueShoppingWithoutClearing =()=>{
    navigate('/products',{ replace: true });

  };
  const ClearCart= () => {
    handleClearCart();
    setShowDialog(false);
    setShowSecondDialog(false);

  };

  const cartTotal = cartList.length === 0
    ? 0
    : cartList.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      );

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {cartList.length === 0 || cartList === null ? (
            <Box className={classes.emptyCartMessage} style={{ width: '100%', height: '250px' ,backgroundColor: '#f1f1f1', }}>
              Your cart is empty. Please add some items.
            </Box>
          ) : (
            cartList.map((item) => (
              <Paper className={classes.paper} spacing={2} key={item.product_serial}>
                <Grid container alignItems="center">
                  <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                  <Box className={classes.image}>
                    <Link to={`/products/${item.app_name}/${item.category.name}/${item.subcategory.name}/${item.type.name}/${item.product_serial}`}>
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
                          <Box display="flex" style={{ marginTop: 'auto' }} alignItems="center">
                            <Button className={classes.quantityButton} onClick={() => updateQuantity(item.product_serial, item.quantity - 1)}>
                              <RemoveIcon />
                            </Button>
                            <span className={classes.quantityText}>{item.quantity}</span>
                            <Button className={classes.quantityButton} onClick={() => updateQuantity(item.product_serial, item.quantity + 1)}>
                              <AddIcon />
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" justifyContent="center">
                            <Box>Price: {parseFloat(item.price).toFixed(2)}</Box>
                            <Box>Total: {parseFloat((item.price * item.quantity).toFixed(2)).toLocaleString()}</Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {cartList.length > 0 && (
            <Card className={classes.checkoutCard}>
              <CardContent className={classes.cardContent}>
                <h2>Cart Total</h2>
                {cartList.map((item) => (
                  <Box key={item.product_serial}>
                    <span>
                      {item.title} ({item.quantity}): {parseFloat(item.price).toFixed(2)}
                    </span>
                    <Box textAlign="right">
                      {parseFloat((item.price * item.quantity).toFixed(2)).toLocaleString()}
                    </Box>
                  </Box>
                ))}
                <hr />
                <Box>
                  <strong>Total:</strong>
                  <Box textAlign="right">
                    {parseFloat(cartTotal.toFixed(2)).toLocaleString()}
                  </Box>
                </Box>
                <Button className={classes.checkoutButton} onClick={handleProceedToCheckout}>
                  Proceed to Orders
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {showDialog && (
        <Dialog open={showDialog} onClose={showDialog}>
          <DialogTitle>Proceed to Orders</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to place orders to respective merchants?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCancelCheckout}>Cancel</Button>
            <Button onClick={handleConfirmCheckout} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showSecondDialog && (
        <Dialog open={showSecondDialog} onClose={showSecondDialog}>
          <DialogTitle> Next Step </DialogTitle>
          <DialogContent>
            <DialogContentText>
             Proceed To 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={ClearCart }>Clear  Cart</Button>
            <Button onClick={handleContinueOrders} autoFocus>
              View Orders 
            </Button>
            <Button onClick={handleContinueShopping} autoFocus>
              Continue Shopping 
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showThirdDialog && (
        <Dialog open={showThirdDialog} onClose={showThirdDialog}>
          <DialogTitle> Next Step </DialogTitle>
          <DialogContent>
            <DialogContentText>
             Proceed To 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleContinueProfile} autoFocus>
              Complete Profile 
            </Button>
            <Button onClick={handleContinueShoppingWithoutClearing} autoFocus>
              Continue Shopping 
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <CustomSnackbar
        showSnackbar={showSnackbar}
        handleClose={handleClose}
        message={message}
        severity={severity}
      />
    </Box>
  );
}

export default CartPage;
