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
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
  const auth=UserAuth()
  const { authTokens, logoutUser ,apiUrl} = useContext(AuthContext);
  const { compareList, setCompareList } = useContext(AuthContext);
  const { cartList, setCartList } = useContext(AuthContext);
  const { favoritesList,setFavoritesList } = useContext(AuthContext);
  const { appname = '', category = '', subcategory = '', type = '', product_serial = '' } = useParams();
  const [product, setProduct] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIntervalId, setCurrentIntervalId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
            setSearchBar,
            isProductInCart,
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
    setMessage(messageToSnackbar);
    setSeverity(severityForSnackbar);
    setShowSnackbar(product.owner_info ? false : true);
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
  const excludedKeys = ["slug", "product_serial"];

  const toReadableFormat = (str) => {
    return str
      .replace(/_/g, ' ')
      .replace(/(?: |\b)(\w)/g, (match, p1) => p1.toUpperCase()); // Capitalize each word
  };
  function formatDate(timestamp) {
    const currentDate = new Date();
    const date = new Date(timestamp);
    const timeDifference = currentDate - date;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Calculate minutes
    const hoursDifference = Math.floor(minutesDifference / 60); // Calculate hours
    const daysDifference = Math.floor(hoursDifference / 24); // Calculate days
  
    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference < 30) {
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference < 365) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
    } else {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
    }
  };
  
  
  const renderProductFields = () => {
    if (!product) {
      return null;
    }

    const keys = Object.keys(product).filter(
      (key) =>
        !excludedKeys.includes(key) &&
        !key.includes("image") &&
        product[key] !== null &&
        (!product[key].hasOwnProperty("name") || product[key].name !== null)
    );

    return keys.map((key, index) => (
      <Grid item xs={6} key={index}>
        <Typography variant="body1">
          {toReadableFormat(key)}:{" "}
          {key === "created" || key === "updated" ? (
            typeof product[key] === "string"
              ? formatDate(product[key])
              : product[key]
          ) : (
            renderValue(product[key])
          )}
        </Typography>
      </Grid>
    ));
  };
  
  

  
const renderValue = (value) => {
  if (value === null) {
    return 'N/A';
  }

  if (typeof value === 'object' && value.name) {
    return value.name;
  }

  return value;
};

// ... (other code)

  useEffect(() => {
    let url = `${apiUrl}/api/products/${appname}`;
    if (category) {
      url += `/${category}`;
    }
    if (subcategory) {
      url += `/${subcategory}`;
    }
    if (type) {
      url += `/${type}`;
    }
    if (product_serial) {
      url += `/${product_serial}`;
    }

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
            setIsLoading(false); // Step 3: Set isLoading to false when products are loaded
          });
        } else {
          setIsLoading(false); // Step 3: Set isLoading to false even if there's an error
          return response.json();
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Step 3: Set isLoading to false in case of error
      });
  }, [appname, category, subcategory, type, authTokens]);
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
  
  


  if (isLoading) {
    // Step 4: Show the spinner while loading
    return (
      <div>
        <div style={{ width: '100%', height: '250px' ,backgroundColor: '#f1f1f1', }}>Product Details Loading</div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </div>
      
    );
  }

  if (!product) {
    return <div style={{ width: '100%', height: '250px', backgroundColor: '#f1f1f1' }}>The product is not  available</div>;
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
           Go Back
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
           Remove From Cart
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
            {renderProductFields()}
      
            </Grid>
            </Box>
          </Paper>
        </Box>

</Container>

  );
};

export default DetailPage;
