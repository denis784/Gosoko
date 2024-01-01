import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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


const DetailPage = () => {
  const [isCopied, setIsCopied] = useState(false);
 
  // ... (code remains the same)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const auth=UserAuth()
  const { authTokens, logoutUser } = useContext(AuthContext);
  const { compareList, setCompareList } = useContext(AuthContext);
  const { cartList, setCartList } = useContext(AuthContext);
  const { favoritesList,setFavoritesList ,apiUrl} = useContext(AuthContext);
  const { appname = '', category = '', subcategory = '', type = '', service_serial = '' } = useParams();
  const [service, setService] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [severity, setSeverity] = useState('info');


  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIntervalId, setCurrentIntervalId] = useState(null);
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % numImages());
  };
  
  

  const messageToSnackbar = auth.user ? 'Merchant details not updated' : 'Login Required';
  const severityForSnackbar = auth.user ? 'info' : 'error';

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setMessage(messageToSnackbar);
    setSeverity(severityForSnackbar);
    setShowSnackbar(service.owner_info ? false : true);
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

 
  const addToCart = (service, quantity) => {
    // Retrieve the cart from local storage
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : [];
  
    // Check if the service exists in the cart
    const serviceIndex = cart.findIndex(
      (item) => item.service_serial === service.service_serial
    );
  
    if (serviceIndex !== -1) {
      // Remove the service with the same serial number from the cart
      cart.splice(serviceIndex, 1);
  
      // Show message
      setMessage("Service removed from cart!");
      setSeverity("warning");
      setShowSnackbar(true);
    } else {
      // Add the service with specified quantity to the cart
      const cartService = {
        ...service,
        quantity,
      };
      cart.push(cartService);
  
      // Show success message
      setMessage("Service added to cart!");
      setSeverity("success");
      setShowSnackbar(true);
    }
  
    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
const handleAddToCompare = (service) => {
  if (!compareList) {
    setCompareList([service]);
    setMessage("Service added for Comparison!");
    setSeverity("success");
  } else {
    const isServiceInCompares = compareList.some(
      (item) => item.service_serial === service.service_serial
    );
  
    if (isServiceInCompares) {
      const newList = compareList.filter(
        (item) => item.service_serial !== service.service_serial
      );
      setCompareList(newList);
      setMessage("Service removed from Comparison List!");
      setSeverity("warning");
    } else {
      setCompareList([...compareList, service]);
      setMessage("Service added for Comparison!");
      setSeverity("success");
    }
  }

  setShowSnackbar(true);
};

useEffect(() => {
  const storedComparesList = JSON.parse(localStorage.getItem("compareList"));
  if (storedComparesList) {
    setCompareList(storedComparesList);
  }
}, []);

useEffect(() => {
  localStorage.setItem("compareList", JSON.stringify(compareList));
}, [compareList]);

  
  
  const handleAddToFavorites = (service) => {
    if (!favoritesList) {
      setFavoritesList([service]);
      setMessage("Service added to favorites!");
      setSeverity("success");
    } else {
      const isServiceInFavorites = favoritesList.some(
        (item) => item.service_serial === service.service_serial
      );
    
      if (isServiceInFavorites) {
        const newList = favoritesList.filter(
          (item) => item.service_serial !== service.service_serial
        );
        setFavoritesList(newList);
        setMessage("Service removed from favorites!");
        setSeverity("warning");
      } else {
        setFavoritesList([...favoritesList, service]);
        setMessage("Service added to favorites!");
        setSeverity("success");
      }
    }
  
    setShowSnackbar(true);
  };
  
  useEffect(() => {
    const storedFavoritesList = JSON.parse(localStorage.getItem("favoritesList"));
    if (storedFavoritesList) {
      setFavoritesList(storedFavoritesList);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  }, [favoritesList]);

  const handleAddToCart = (service) => {
    if (!cartList) {
      setCartList([service]);
      setMessage("Service added to cart!");
      setSeverity("success");
    } else {
      const isServiceInCarts = cartList.some(
        (item) => item.service_serial === service.service_serial
      );
    
      if (isServiceInCarts) {
        const newList = cartList.filter(
          (item) => item.service_serial !== service.service_serial
        );
        setCartList(newList);
        setMessage("Service removed from cart!");
        setSeverity("warning");
      } else {
        setCartList([...cartList, service]);
        setMessage("Service added to  cart!");
        setSeverity("success");
      }
    }
  
    setShowSnackbar(true);
  };
  
  useEffect(() => {
    const storedCartList = JSON.parse(localStorage.getItem("cartList"));
    if (storedCartList) {
      setCartList(storedCartList);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);
  
  
  
  


  const handleShowCart = () => {
    setExpanded(false);
    setShowCart(!showCart);
    
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  }; 


  useEffect(() => {
    let url = `${apiUrl}/api/services/${appname}`;
    if (category) {
      url += `/${category}`;
    }
    if (subcategory) {
      url += `/${subcategory}`;
    }
    if (type) {
      url += `/${type}`;
    }
    if (service_serial) {
      url += `/${service_serial}`;
    }
    console.log(url);

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
          setService(data[0]); // Access the first element of the array
          
          console.log(data);
        });
      } else {
        return response.json();
      }
    })
    .catch((error) => console.error(error));
  }, [appname, category, subcategory, type ,authTokens]);

  const imageKeys = service ? Object.keys(service).filter((key) => key.startsWith("image")) : [];





  const handlePrev = () => {
    if (service) {
      setCurrentIndex((currentIndex - 1 + numImages()) % numImages());
    }
  };
  const numImages = () => {
    if (service) {
      return Object.keys(service).filter(key => key.startsWith("image") && service[key]).length;
    } else {
      return 0;
    }
  };
  
  
  
  const remainingImages = numImages() - (currentIndex + 1);
  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };
  
  


  if (!service) {
    return <div>No service Matched</div>;
  }

  return (

<Container sx={{ marginTop: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Box sx={{ position: "relative" }}>
  {/* Render larger image box */}
  <Box
    sx={{
      position: "relative",
      maxHeight: "100%",
      maxWidth: "100%",
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
        image={service && service[imageKeys[currentIndex]]}
        alt={`service-${currentIndex + 1}`}
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
    {imageKeys.filter((key) => service && service[key]).map((key, index) => {
      const image = service[key];
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
            alt={`service-${index + 1}`}
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
    {service && `${currentIndex + 1}/${numImages()}`}
    
</Box>
</Box>
    

        </Grid>
        <Grid item xs={12} sm={6} >
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {service.title}
              </Typography>
              <Typography variant="body2" color="primary">
                {`Price: ${service.currency} ${service.price} `}
              </Typography>
            </CardContent>
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
              onClick={() => handleAddToFavorites(service)}
              sx={{ flex: 1, mr: 1 }}
            >
              <Favorite />
            </IconButton>
            <IconButton
              onClick={() => handleAddToCompare(service)}
              sx={{ flex: 1, mx: 1 }}
            >
              <Compare />
            </IconButton>
            <IconButton onClick={handleShowCart}>
              <AddShoppingCart sx={{ flex: 1, mx: 1 }} />
            </IconButton>
            <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button 
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              size="small" color="primary"
              variant="contained" 
              name="showdetails" 
              sx={{ color: 'white' }}
              >
                Contact Merchant
              </Button>
              
            </CardActions>
          </Box>
          )}
          <CustomSnackbar
            showSnackbar={showSnackbar}
            handleClose={handleClose}
            message={message}
            severity={severity}
          />

        <Collapse in={expanded} timeout="auto" unmountOnExit>

          {service.owner_info ? (
            <>
               <Typography variant="body1" >
                  Name:
                </Typography>
                <Typography variant="subtitle1">
                  {service.owner_info.name}
                </Typography>

            </>
          ) : null}
          {service.owner_info ? (
            <>
              <Typography variant="body1" >Phone Number :</Typography>
              <CopyText
                  variant="subtitle1"
                  onClick={() => handleCopyPhone(service.owner_info.phone_number)}
                  className={isCopied ? 'copied' : ''}
                >
                  {isCopied ? 'Copied!' : service.owner_info.phone_number}
                </CopyText>
            </>
          ) : null}
        </Collapse>
        {showCart && (
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
              onClick={() => handleAddToCart(service, quantity)}
              sx={{ flex: 1, mx: 1 }}
            >
              Add
            </Button>
          </Box>
        )}

        
          </Card>
          

        </Grid>
      </Grid>
    
        <Box mt={2}>
          <Typography variant="h6">Details</Typography>
          <Paper>
            <Box p={2}>
            <Grid container spacing={2}>
              {service.category && (
                <Grid item xs={6}>
                  <Typography variant="body1">Category: {service.category.name}</Typography>
                </Grid>
              )}
              {service.subcategory && (
                <Grid item xs={6}>
                  <Typography variant="body1">Subcategory: {service.subcategory.name}</Typography>
                </Grid>
              )}
              {service.type && (
                <Grid item xs={6}>
                  <Typography variant="body1">Type: {service.type.name}</Typography>
                </Grid>
              )}
              {service.color && (
                <Grid item xs={6}>
                  <Typography variant="body1">Color: {service.color.name}</Typography>
                </Grid>
              )}
              {service.size && (
                <Grid item xs={6}>
                  <Typography variant="body1">Size: {service.size.name}</Typography>
                </Grid>
              )}
              {service.material && (
                <Grid item xs={6}>
                  <Typography variant="body1">Material: {service.material.name}</Typography>
                </Grid>
              )}
              {service.brand && (
                <Grid item xs={6}>
                  <Typography variant="body1">Brand: {service.brand.name}</Typography>
                </Grid>
              )}
              {service.condition && (
                <Grid item xs={6}>
                  <Typography variant="body1">Condition: {service.condition.name}</Typography>
                </Grid>
              )}
              {service.processor && (
                <Grid item xs={6}>
                  <Typography variant="body1">Processor: {service.processor.name}</Typography>
                </Grid>
              )}
              {service.model && (
                <Grid item xs={6}>
                  <Typography variant="body1">Model: {service.model.name}</Typography>
                </Grid>
              )}
              {service.ram && (
                <Grid item xs={6}>
                  <Typography variant="body1">Material: {service.ram.name}</Typography>
                </Grid>
              )}
              {service.ram_metrics && (
                <Grid item xs={6}>
                  <Typography variant="body1">Ram Metrics: {service.ram_metrics.name}</Typography>
                </Grid>
              )}
              {service.storage_type && (
                <Grid item xs={6}>
                  <Typography variant="body1">Storage Type: {service.storage_type.name}</Typography>
                </Grid>
              )}
              {service.storage && (
                <Grid item xs={6}>
                  <Typography variant="body1">Storage: {service.ram.name}</Typography>
                </Grid>
              )}
              {service.graphics_card && (
                <Grid item xs={6}>
                  <Typography variant="body1">Graphics Card: {service.graphics_card.name}</Typography>
                </Grid>
              )}
               {service.screen_size && (
                <Grid item xs={6}>
                  <Typography variant="body1">Graphics Card: {service.screen_size.name}</Typography>
                </Grid>
              )}
              {service.operating_system && (
              <Grid item xs={6}>
                <Typography variant="body1"> Operating System: {service.operating_system.name}</Typography>
              </Grid>
              )}
              {service.weight && (
              <Grid item xs={6}>
                <Typography variant="body1"> Weight: {service.weight.name}</Typography>
              </Grid>
              )}
              {service.weight_metrics && (
              <Grid item xs={6}>
                <Typography variant="body1"> Weight Metrics: {service.weight_metrics .name}</Typography>
              </Grid>
              )}
              {service.rating && (
                <Grid item xs={6}>
                  <Typography variant="body1">rating: {service.rating}</Typography>
                </Grid>
              )}
              {service.negotiable && (
                <Grid item xs={6}>
                  <Typography variant="body1">Negotiable: {service.rating}</Typography>
                </Grid>
              )}
              {service.region && (
                <Grid item xs={6}>
                  <Typography variant="body1">Region: {service.region.name}</Typography>
                </Grid>
              )}
              {service.region && (
                <Grid item xs={6}>
                  <Typography variant="body1">County: {service.region.county.name}</Typography>
                </Grid>
              )}
              {service.region && (
                <Grid item xs={6}>
                  <Typography variant="body1">SubCounty: {service.region.subcounty.name}</Typography>
                </Grid>
              )}
            </Grid>
            </Box>
          </Paper>
        </Box>

</Container>

  );
};

export default DetailPage;
