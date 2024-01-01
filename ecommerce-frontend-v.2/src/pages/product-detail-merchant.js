import React, { useState, useContext, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserAuth,AuthContext } from '../auth/auth';
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Input,
  styled,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Paper,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { AddShoppingCart, Compare, Favorite } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CustomSnackbar from '../components/snackbar';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';

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
  backgroundColor: '#f5f5f5',
  borderRadius: '2px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '5px',
});
const CopyText = styled(Typography)({
  cursor: 'pointer',
  textDecoration: 'underline',
  '&:hover': {
    color: 'blue',
  },
  '&::after': {
    content: '"Copied!"',
    color: '#fff',
    backgroundColor: 'green',
    borderRadius: '2px',
    padding: '2px 4px',
    marginLeft: '10px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&.copied::after': {
    opacity: 1,
  },
});


const Product_DetailPage = () => {
  const [isCopied, setIsCopied] = useState(false);
 
  // ... (code remains the same)
  const auth=UserAuth()
  const navigate=useNavigate()
  const { authTokens, logoutUser ,apiUrl} = useContext(AuthContext);
  const { compareList, setCompareList } = useContext(AuthContext);
  const { cartList, setCartList } = useContext(AuthContext);
  const { favoritesList,setFavoritesList } = useContext(AuthContext);
  const { product_serial = '' } = useParams();
  const [product, setProduct] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIntervalId, setCurrentIntervalId] = useState(null);
  const {
            setMessage,
            messageToSnackbar,
            setSeverity,
            severity,
            severityForSnackbar,
            setShowSnackbar,
            message,
            showSnackbar,
            handleClose,
            setSearchBar,
  }=useContext(AuthContext);
  
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % numImages());
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showCart]);
  
  

  
  const handleExpandClick = () => {
    setExpanded(!expanded);
    
  };

  const handleRightButtonClick=() =>{
    Navigate(`/minidrawer/products&services/detail/${product_serial}`)
  };

  const handleCopyPhone = (phoneNumber) => {
    const el = document.createElement('textarea');
    el.value = phoneNumber;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setMessage('Phone number copied to clipboard!')
    setSeverity('success');
    setShowSnackbar(true);
    setIsCopied(true);
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
    setSearchBar(false)
  }, []);
  


  useEffect(() => {
    let url = `${apiUrl}/api/products/detail/${product_serial}`;
    

    function getRequestOptions(authTokens) {
      const headers = {
        'Content-Type': 'application/json'
      };

      if (authTokens) {
        headers.Authorization = `Bearer ${authTokens.access}`;
      }

      return {
        method: 'GET',
        headers: headers
      };
    }

    const requestOptions = getRequestOptions(authTokens);
    fetch(url, requestOptions)
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((data) => {});
      } else if (response.status === 200) {
        return response.json().then((data) => {
          setProduct(data[0]); // Access the first element of the array          
     
        });
      } else {
        return response.json();
      }
    })
    .catch((error) => console.error(error));
  }, [authTokens]);

  const imageKeys = product ? Object.keys(product).filter((key) => key.startsWith("image")) : [];

  const handlePrev = () => {
    if (product) {
      setCurrentIndex((currentIndex - 1 + numImages()) % numImages());
    }
  };
  const numImages = () => {
    if (product) {
      return Object.keys(product).filter(key => key.startsWith("image") && product[key]).length;
    } else {
      return 0;
    }
  };
  
  
  
  const remainingImages = numImages() - (currentIndex + 1);
  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };
  
  


  if (!product) {
    return <div style={{ width: '100%', height: '250px' ,backgroundColor: '#f1f1f1', }}>Loading the Products</div>;
  }

  return (

<Container component="main" maxHeight="100mvh"maxWidth="100%" sx={{ marginTop: '1rem' , backgroundColor: '#f1f1f1',}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Box sx={{ position: "relative" }}>
          {/* Render larger image box */}
          <Box
            sx={{
              position: "relative",
              hangingPunctuationeight: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "block",
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            >
              {/* Render image in larger box */}
              <CardMedia
                component="img"
                image={product && product[imageKeys[currentIndex]]}
                alt={`product-${currentIndex + 1}`}
                sx={{
                  objectFit: "cover",
                  cursor: "pointer",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
                onClick={() => {
                  handleImageClick(currentIndex);
                }}
              />
            </Box>
            {/* Render arrow buttons for navigation */}
            <Box sx={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  },
                }}
                onClick={handlePrev}
              >
                <ChevronLeft />
              </IconButton>
            </Box>
            <Box sx={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  },
                }}
                onClick={handleNext}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          {/* New Box for small image boxes */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              paddingLeft: 7,
              paddingRight: 7,
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageKeys.filter((key) => product && product[key]).map((key, index) => {
              const image = product[key];
              return (
                // Render smaller image box
                <Box
                  key={index}
                  sx={{
                    width: 60,
                    height: 60,
                    margin: 1,
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: index === currentIndex ? "2px solid black" : "none",
                  }}
                >
                  {/* Render image in smaller box */}
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`product-${index + 1}`}
                    sx={{
                      objectFit: "cover",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                    onClick={() => {
                      handleImageClick(index);
                    }}
                  />
                </Box>
              );
            })}
          </Box>
          
          {/* Render current image count */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 7,
              transform: "translateY(0)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: 20,
              padding: 2,
              fontSize: 14,
            }} 
            >
            {product && `${currentIndex + 1}/${numImages()}`}
            
        </Box>
        </Box>          

        </Grid>
        <Grid item xs={12} sm={6} >
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="primary">
              {`Price: ${product.currency ? product.currency : 'N/A'} ${product.price ? product.price : 'N/A'} ${product.per && product.per.name ? `per ${product.per.name}` : ''}`}
            </Typography>
            </CardContent>
           
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              {/* Left Button */}
              <Button
                onClick={handleExpandClick}
                size="small"
                color="primary"
                variant="contained"
                name="leftButton"
                sx={{ color: 'white', }}
              >
                Contact Details
              </Button>

              {/* Right Button */}
              <Button
                onClick={handleRightButtonClick}
                size="small"
        
                variant="contained"
                name="rightButton"
                sx={{ color: 'white' ,backgroundColor:'error'}}
              >
                Edit Product
              </Button>
            </Box>

          
          <CustomSnackbar
            showSnackbar={showSnackbar}
            handleClose={handleClose}
            message={message}
            severity={severity}
          />

        <Collapse in={expanded} timeout="auto" unmountOnExit>

          {product.owner_info ? (
            <>
               <Typography variant="body1" >
                  Name:
                </Typography>
                <Typography variant="subtitle1">
                  {product.owner_info.name}
                </Typography>

            </>
          ) : null}
          {product.owner_info ? (
            <>
              <Typography variant="body1" >Phone Number :</Typography>
              <CopyText
                  variant="subtitle1"
                  onClick={() => handleCopyPhone(product.owner_info.phone_number)}
                  className={isCopied ? 'copied' : ''}
                >
                  {isCopied ? 'Copied!' : product.owner_info.phone_number}
                </CopyText>
            </>
          ) : null}
        </Collapse>
        
        
          </Card>
          

        </Grid>
      </Grid>
    
        <Box mt={2}>
          <Typography variant="h6">Details</Typography>
          <Paper>
            <Box p={2}>
            <Grid container spacing={2}>
              {product.category && (
                <Grid item xs={6}>
                  <Typography variant="body1">Category: {product.category.name}</Typography>
                </Grid>
              )}
              {product.subcategory && (
                <Grid item xs={6}>
                  <Typography variant="body1">Subcategory: {product.subcategory.name}</Typography>
                </Grid>
              )}
              {product.type && (
                <Grid item xs={6}>
                  <Typography variant="body1">Type: {product.type.name}</Typography>
                </Grid>
              )}
              {product.color && (
                <Grid item xs={6}>
                  <Typography variant="body1">Color: {product.color.name}</Typography>
                </Grid>
              )}
              {product.size && (
                <Grid item xs={6}>
                  <Typography variant="body1">Size: {product.size.name}</Typography>
                </Grid>
              )}
              {product.material && (
                <Grid item xs={6}>
                  <Typography variant="body1">Material: {product.material.name}</Typography>
                </Grid>
              )}
              {product.brand && (
                <Grid item xs={6}>
                  <Typography variant="body1">Brand: {product.brand.name}</Typography>
                </Grid>
              )}
              {product.condition && (
                <Grid item xs={6}>
                  <Typography variant="body1">Condition: {product.condition.name}</Typography>
                </Grid>
              )}
              {product.processor && (
                <Grid item xs={6}>
                  <Typography variant="body1">Processor: {product.processor.name}</Typography>
                </Grid>
              )}
              {product.model && (
                <Grid item xs={6}>
                  <Typography variant="body1">Model: {product.model.name}</Typography>
                </Grid>
              )}
              {product.ram && (
                <Grid item xs={6}>
                  <Typography variant="body1">Material: {product.ram.name}</Typography>
                </Grid>
              )}
              {product.ram_metrics && (
                <Grid item xs={6}>
                  <Typography variant="body1">Ram Metrics: {product.ram_metrics.name}</Typography>
                </Grid>
              )}
              {product.storage_type && (
                <Grid item xs={6}>
                  <Typography variant="body1">Storage Type: {product.storage_type.name}</Typography>
                </Grid>
              )}
              {product.storage && (
                <Grid item xs={6}>
                  <Typography variant="body1">Storage: {product.ram.name}</Typography>
                </Grid>
              )}
              {product.graphics_card && (
                <Grid item xs={6}>
                  <Typography variant="body1">Graphics Card: {product.graphics_card.name}</Typography>
                </Grid>
              )}
               {product.screen_size && (
                <Grid item xs={6}>
                  <Typography variant="body1">Graphics Card: {product.screen_size.name}</Typography>
                </Grid>
              )}
              {product.operating_system && (
              <Grid item xs={6}>
                <Typography variant="body1"> Operating System: {product.operating_system.name}</Typography>
              </Grid>
              )}
              {product.weight && (
              <Grid item xs={6}>
                <Typography variant="body1"> Weight: {product.weight.name}</Typography>
              </Grid>
              )}
              {product.weight_metrics && (
              <Grid item xs={6}>
                <Typography variant="body1"> Weight Metrics: {product.weight_metrics .name}</Typography>
              </Grid>
              )}
              {product.rating && (
                <Grid item xs={6}>
                  <Typography variant="body1">rating: {product.rating}</Typography>
                </Grid>
              )}
              {product.negotiable && (
                <Grid item xs={6}>
                  <Typography variant="body1">Negotiable: {product.rating}</Typography>
                </Grid>
              )}
              {product.region && (
                <Grid item xs={6}>
                  <Typography variant="body1">Region: {product.region.name}</Typography>
                </Grid>
              )}
              {product.region && (
                <Grid item xs={6}>
                  <Typography variant="body1">County: {product.region.county.name}</Typography>
                </Grid>
              )}
              {product.region && (
                <Grid item xs={6}>
                  <Typography variant="body1">SubCounty: {product.region.subcounty.name}</Typography>
                </Grid>
              )}
            </Grid>
            </Box>
          </Paper>
        </Box>

</Container>

  );
};

export default Product_DetailPage;
