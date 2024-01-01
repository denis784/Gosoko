import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link ,useNavigate} from 'react-router-dom';

const MultiLevelSidebar = ({ data, open, onClose }) => {
  const navigate=useNavigate()
  const [level, setLevel] = useState(0);
  const [whatWasClicked,setWhatWasClicked]=useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [serviceMenuAnchorEl, setServiceMenuAnchorEl] = useState(null);
  const [productNameMenuAnchorEl, setProductNameMenuAnchorEll] = useState(null);


  const updateCategoryName = (appName) => {
    // Word replacements
    if (appName === "cateringandevent") appName = "catering & event";
    else if (appName === "mechanic") appName = "mechanic";
    else if (appName === "beauty") appName = "beauty";
    else if (appName === "computerandit") appName = "computers & it";
    else if (appName === "transportation") appName = "Transport";
    else if (appName === "cleaning") appName = "cleaning";
    else if (appName === "computersandaccessories") appName = "computers & Accessories";
    else if (appName === "tvandaudio") appName = "tvs & Audio";
    else if (appName === "baby_items") appName = "baby items";
    else if (appName === "homeandoffice") appName = "home and office";
    else if (appName === "phoneandtablet") appName = "phones and Tablets";

    
    // Camel casing
    appName = appName.replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
  
    return appName;
  };

  const handleItemClick = (item, level) => {
    switch (level) {
      case 0:
        setSelectedCategory(item);
        console.log('this is the item',item);
        console.log(selectedCategory);
        console.log('updated level',level);
      
        break;
      case 1:
        console.log('this is the subcategory',item);
        setSelectedSubcategory(item);
        console.log('updated level',level);
        break;
      case 2:
        console.log('this is the types',item);
        setSelectedType(item);
        break;
      default:
        break;
    }
    setLevel(level + 1);
  };

  const Count = ({ value }) => {
    return <span>{value}</span>;
  };

  const goBack = () => {
    if (level > 0) {
      setLevel(level - 1);
    }
    if (level === 2) {
      setSelectedType(null);
    }
    if (level === 1) {
      setSelectedSubcategory(null);
    }
    if (level === 0) {
      setSelectedCategory(null);
    }
  };

  const displayItems = () => {
    if (!data || (!data.products && !data.services)) {
      return <Typography variant="body1">No data available.</Typography>;
    }
    if (level === 0) {
      return (
        <>
           <ListItem disablePadding>
            <ListItemText primary="PRODUCTS" onClick={()=>navigate(`/products/`, {replace: true})} />
            <ListItemIcon>
              <IconButton
                onClick={(event) =>
                  setProductNameMenuAnchorEll(event.currentTarget)
                }
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Menu
            anchorEl={productNameMenuAnchorEl}
            open={Boolean(productNameMenuAnchorEl)}
            onClose={() => setProductNameMenuAnchorEll(null)}
          >
            {data.products.map((product, index) => {
              let appName = product.app_name;

              // Word replacements
              if (appName === "phoneandtablet") appName = "phones and Tablets";
              else if (appName === "computersandaccessories") appName = "computers & Accessories";
              else if (appName === "tvandaudio") appName = "tvs & Audio";
              else if (appName === "baby_items") appName = "baby items";
              else if (appName === "homeandoffice") appName = "home and office";

              // Camel casing
              appName = appName.replace(/\b\w/g, (match) => match.toUpperCase());

              return (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleItemClick(product, level);
                    setWhatWasClicked("products");

                    console.log('updated level', level);
                  }}
                >
                  {appName}
                </MenuItem>
              );
            })}
          </Menu>


          <ListItem disablePadding>
            <ListItemText primary="SERVICES" onClick={()=>navigate(`/services/`, {replace: true})}/>
            <ListItemIcon>
              <IconButton
                onClick={(event) =>
                  setServiceMenuAnchorEl(event.currentTarget)
                }
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Menu
            anchorEl={serviceMenuAnchorEl}
            open={Boolean(serviceMenuAnchorEl)}
            onClose={() => setServiceMenuAnchorEl(null)}
          >
            {data.services
              .slice() // Create a shallow copy of the services array
              .sort((a, b) => a.app_name.localeCompare(b.app_name)) // Sort the services alphabetically by app_name
              .map((service, index) => {
                let appName = service.app_name;

                // Word replacements
                if (appName === "cateringandevent") appName = "catering & event";
                else if (appName === "computerandit") appName = "computers & it";
                else if (appName === "transportation") appName = "Transport";

                // Camel casing
                appName = appName.replace(/\b\w/g, (match) => match.toUpperCase());

                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleItemClick(service, level);
                      setWhatWasClicked("services");
                    }}
                  >
                    {appName}
                  </MenuItem>
                );
              })}
          </Menu>



          
        </>
      );
    
    }if (level === 1 && selectedCategory !== null) {
      return (
        <>
          <ListItem  >
            <ListItemIcon>
              <ArrowBackIosIcon onClick={goBack} />
            </ListItemIcon>
            <ListItemText 
              component={Link}
              button
              onClick={()=>navigate(`/${whatWasClicked}/${selectedCategory.app_name}/`, {replace: true})}
              primary={updateCategoryName(selectedCategory.app_name)}
            />

            <ListItemIcon>
              <Typography variant="subtitle2">
                <Count value={selectedCategory.app_count} />
              </Typography>
            </ListItemIcon>
          </ListItem>
          {selectedCategory.categories.map((category, index) => (
            <ListItem                            
              
            >
              <ListItemText 
              onClick={()=>navigate(`/${whatWasClicked}/${selectedCategory.app_name}/${category.category}/ `, {replace: true})}
              primary={category.category} />
              <ListItemIcon>
              </ListItemIcon>
              <ListItemIcon>
                <Typography variant="subtitle2">
                  <Count value={category.category_count} />
                </Typography>
              </ListItemIcon>
              <IconButton
              onClick={() => {
                handleItemClick(category, level);
              }}
               
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItem>
          ))}
        </>
      );
    
    
   } else if (level === 2 && selectedSubcategory !== null) {
      return (
        <>
          <ListItem >
            <ListItemIcon  onClick={goBack}>
              <ArrowBackIosIcon />
            </ListItemIcon>
            <ListItemText 
            onClick={()=>navigate(`/${whatWasClicked}/${selectedCategory.app_name}/${selectedSubcategory.category}/`, {replace: true})}
    
            primary={selectedSubcategory.category} />
            <ListItemIcon>
              <Typography variant="subtitle2"> 
                <Count value={selectedSubcategory.category_count} />
              </Typography>
            </ListItemIcon>
          </ListItem>
          {selectedSubcategory.subcategories.map((subcategory, index) => (
            <ListItem
              key={index}
              
            >
              <ListItemText 
               onClick={()=>navigate(`/${whatWasClicked}/${selectedCategory.app_name}/${selectedSubcategory.category}/${subcategory.subcategory}/ `, {replace: true})}
    
              primary={subcategory.subcategory} />
              <ListItemIcon>
                <Typography variant="subtitle2">
                  <Count value={subcategory.subcategory_count} />
                </Typography>
              </ListItemIcon>
              <IconButton
                onClick={() => {
                  handleItemClick(subcategory, level);
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItem>
          ))}
        </>
      );
    }else if (level === 3 && selectedType !== null) {
      return (
        <>
          <ListItem button onClick={goBack}>
            <ListItemIcon>
              <ArrowBackIosIcon />
            </ListItemIcon>
            <ListItemText primary={selectedType.type} />
            <ListItemIcon>
              <Typography variant="subtitle2">
                <Count value={selectedType.type_count} />
              </Typography>
            </ListItemIcon>
          </ListItem>
          {selectedType.types.map((type, index) => (
          <ListItem
            button
            key={index}
            
          >
            <ListItemText 
            onClick={()=>navigate(`/${whatWasClicked}/${selectedCategory.app_name}/${selectedSubcategory.category}/${selectedType.subcategory}/${type.type}/ `, {replace: true})}
    
            primary={type.type} />
            <ListItemIcon>
              <Typography variant="subtitle2">
                <Count value={type.type_count} />
              </Typography>
            </ListItemIcon>
          </ListItem>
        ))}

          {/* Your code for level 4 here */}
        </>
      );
    }
  };

  

  return (
    <Drawer
  anchor="left"
  open={open}
  onClose={onClose}
  sx={{
    height: 'calc(100% - 64px)', // Set the height of the sidebar to fill the remaining screen space
    position: 'fixed', // Make the sidebar position fixed
    top: '64px', // Set the top offset to the height of the menu bar
    borderRadius: '10px',
  }}
>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 1,
    }}
  >
    <Typography variant="h6"></Typography>
    <IconButton onClick={onClose}>
      <CloseIcon />
    </IconButton>
  </Box>
  {data ? (
    <List>{displayItems()}</List>
  ) : (
    <Typography variant="body1">No data available.</Typography>
  )}
</Drawer>




  );
};

export default MultiLevelSidebar;

