import React, { useState ,useContext,useEffect} from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Input,
  styled,
} from '@mui/material';
import { AddShoppingCart, Compare, Favorite } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';
import CustomSnackbar from '../snackbar';
import { AuthContext } from '../../auth/auth';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledBox = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '2px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '5px',
});

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const {
    handleAddToCart,
    handleAddToCompare,
    handleAddToFavorites,
    setMessage,
    messageToSnackbar,
    setSeverity,
    severity,
    severityForSnackbar,
    setShowSnackbar,
    message,
    showSnackbar,
    handleClose,
    isProductInCart,
   }=useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuantity(value);
  };

  
  const handleShowCart = () => {
    setExpanded(false);
    setShowCart(!showCart);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showCart]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
       <CustomSnackbar
            showSnackbar={showSnackbar}
            handleClose={handleClose}
            message={message}
            severity={severity}
          />
      <StyledBox p={1}>
      <Link
          to={`/products/${product.app_name}/${product.category.name}/${product.subcategory.name}/${product.type.name}/${product.product_serial}`}
        >
          <img
            src={product.image1}
            alt={product.name}
            style={{ width: '100%', height: '270px', objectFit: 'cover' }}
          />
        </Link>
        <Typography variant="subtitle1" color={'primary'}>
          {product.title}
        </Typography>
        <Typography variant="subtitle1">
          {product.currency} {product.price} 
        </Typography>
          {!showCart && (
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <IconButton
              onClick={() => handleAddToFavorites(product)}
              sx={{ flex: 1, mr: 1 }}
            >
              <Favorite />
            </IconButton>
            <IconButton
              onClick={() => handleAddToCompare(product)}
              sx={{ flex: 1, mx: 1 }}
            >
              <Compare />
            </IconButton>
            <IconButton onClick={handleShowCart}>
              <AddShoppingCart sx={{ flex: 1, mx: 1 }} />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {product.region ? (
            <Typography variant="subtitle1">
              Region {product.region.name}
            </Typography>
          ) : null}
          {product.description ? (
            <>
              <Typography paragraph>Description</Typography>
              <Typography paragraph>{product.description}</Typography>
            </>
          ) : null}
        </Collapse>
        {showCart && !isProductInCart(product) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              inputProps={{ min: 1 }}
              sx={{ flex: 1, mr: 1 }}
            />
            <Button
              variant="contained"
              onClick={() => handleAddToCart(product, quantity)}
              sx={{ flex: 1, mx: 1 ,color: 'white',}}
            >
              Add
            </Button>
          </Box>
        )}
        {showCart && isProductInCart(product) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
          
          <Button
           variant="contained"
           onClick={() => setShowCart(!showCart)}
           sx={{
             flex: 1,
             mx: 1,
             color: 'white', // Set the text color to white
           }}
         >
           Back
         </Button>
         
         <Button
           variant="contained"
           onClick={() => handleAddToCart(product, quantity)}
           sx={{
             flex: 1,
             mx: 1,
             backgroundColor: 'red', // Set the initial background color of the button to red
             color: 'white', // Set the text color to white
             '&:hover': {
               backgroundColor: 'darkred', // Set the background color of the button to dark red on hover
             },
           }}
         >
           Remove
         </Button>
         
          </Box>
        )}

      </StyledBox>
    </Grid>
  );
};  
export default ProductCard;