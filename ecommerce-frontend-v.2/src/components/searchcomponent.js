import React, { useState ,useEffect ,useContext} from 'react';
import MultiLevelSidebar from './sidebar';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Select,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/auth';

const SearchBar = () => {
    const { searchValue, setSearchValue ,apiUrl} = useContext(AuthContext);
    const [placeholder, setPlaceholder] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [appList, setAppList] = useState([]);
    const location = useLocation();
    
    useEffect(() => {
      setPlaceholder('');
      setAppList([]);
      const currentLink = location.pathname.split('/').pop();
      fetch(`${apiUrl}/api/${currentLink}/navbar/`)
        .then((response) => {
          if (response.status === 404) {
            return response.json().then((data) => {
              setAppList([]);
            });
          } else if (response.status === 200) {
            return response.json().then((data) => {
              setAppList(data);
            });
          } else {
            setAppList([]);
            return response.json();
          }
        });
  
      // Update the search placeholder based on the current route or selected option
      if (selectedOption !== undefined && selectedOption !== '') {
        setPlaceholder(`Search in ${updateCategoryName(selectedOption)}...`);
      } else { 
        const decodedLink = decodeURIComponent(currentLink);
        setPlaceholder(`Search in ${updateCategoryName(decodedLink)}...`);
      }
      
    }, [location, selectedOption]);
  
    const searchWidth = () => {
      if (isXs) return '60%';
      if (isSm) return '70%';
      return '50%';
    };
  
    const handleSearchInputChange = (event) => {
      const value = event.target.value;
      setSearchValue(value);
      
    };
  
    const handleSearchInputEnter = (event) => {
      if (event.key === 'Enter') {
        const value = event.target.value;
        setSearchValue(value);
        // perform search or redirect to search page
      }
    };
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
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
   };
   const theme = useTheme();
   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
   const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
   const isLg = useMediaQuery(theme.breakpoints.up('lg'));

   const marginLeftBasedOnScreenSize = () => {
    if (isXs) return 10;
    if (isSm) return 30;
    if (isLg) return 41;
    return 5;
     };
   return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="2rem"
      border="2px solid green"
      p={1}
      width={searchWidth()}
      maxWidth="1000px"
      maxHeight="35px"
      marginLeft={marginLeftBasedOnScreenSize()}
    >
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          marginRight: '1rem',
          width: isXs ? '30%' : '20%',
          '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 0,
          },
        }}
        disableUnderline
        variant="standard"
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          classes: {
            paper: 'selectMenu',
          },
        }}
      >
        <MenuItem value="">Select an option</MenuItem>
        {appList.map((app) => (
          <MenuItem key={app} value={app}>
            {updateCategoryName(app)}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setSelectedOption('')} style={{ color: '#f44336' }}>
          Reset
        </MenuItem>
      </Select>
  
      <InputBase
        placeholder={updateCategoryName(placeholder)}
        value={searchValue}
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchInputEnter}
        style={{
          flexGrow: 1,
          minWidth: '70px',
          maxWidth: isXs ? '40%' : '60%',
        }}
      />
  
      <IconButton aria-label="search" style={{ marginLeft: '1rem', width: isXs ? '15%' : '10%' }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
export default SearchBar;  
   