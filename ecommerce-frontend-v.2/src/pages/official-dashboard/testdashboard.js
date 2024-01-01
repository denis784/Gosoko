import React, { useContext,useState,useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {  Menu, MenuItem, Select } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import ProductsServicesIcon from '@mui/icons-material/LocalMall';
import AccountsIcon from '@mui/icons-material/AccountBox';
import { Link ,useLocation } from 'react-router-dom';
import MerchantDashboard from './Dashboards/merchant';
import {AuthContext} from  './../../auth/auth';
import Breadcrumb from '../../components/breadcrumb';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({children}) {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {dashboardtype ,setDashboardType,authTokens}=useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState('');

  
  const handleDropdownClose = () => {
    setOpen(false);
  };

  const handleOptionSelect = (option) => {
    // Check if the selected option is different from the current dashboardtype
    if (option !== dashboardtype) {
      setDashboardType(option);
      setSelectedOption(option);
      
    }
  };
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  const getOptionsFromAuthTokens = () => {
    const options = [];
    
    if (authTokens) {
      
      if (authTokens.merchant === true || authTokens.merchant === 'True' ) {
        options.push('Merchant');
      }
      if (authTokens.customer === true || authTokens.customer === 'True') {
        options.push('Customer');
      }
      if (authTokens.admin === true || authTokens.admin === 'True') {
        options.push('Admin');
      }
    }
    return options;
  };

  // Exclude the dashboardtype from the dynamically generated options
  const filteredOptions = getOptionsFromAuthTokens().filter((option) => option !== selectedOption);


   // Function to render the list items
  const renderListItems = (texts) => {
    return texts.map((text) => {
      let icon = null;
      let navigatelink = null;

      if (text === 'Product Orders') {
        icon = <SupportAgentIcon />;
        navigatelink = '/dashboard/product_orders';
      } else if (text === 'Profile') {
        icon = <PersonIcon />;
        navigatelink = '/dashboard/profile';
      } else if (text === 'Account') {
        icon = <SettingsIcon />;
        navigatelink = '/dashboard/account';
      } else if (text === 'Business') {
        icon = <BusinessIcon />;
        navigatelink = '/dashboard/businesses';
      } else if (text === 'Products || Services') {
        icon = <ProductsServicesIcon />;
        navigatelink = '/dashboard/products&services';
      } else if (text === 'Settings') {
        icon = <SettingsIcon />;
        // Handle the link for Settings (Add the navigatelink if needed)
      } else if (text === 'Accounts') {
        icon = <AccountsIcon />;
        navigatelink = '/dashboard/accounts';
      }else if (text === 'Service Orders') {
        icon = <SupportAgentIcon />;
        navigatelink = '/dashboard/service_orders';
      }

      // Check if the current location matches the navigatelink
      const isActive = location.pathname === navigatelink;

      return (
        <ListItem key={text} disablePadding sx={{ display: 'block', ...(isActive && { backgroundColor: '#f0f0f0' }) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            component={Link} // Set the component to Link
            to={navigatelink} // Set the destination link
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      );
    });
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'red',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src="./images/Logo.png" alt="Logo" style={{ height: '50px', marginRight: '20px' }} />
          </Typography>

         {/* Dropdown */}
          {dashboardtype}
          <Select
          value={selectedOption}
          onChange={(e) => handleOptionSelect(e.target.value)}
          displayEmpty
          onClose={handleDropdownClose}
          sx={{ marginLeft: 'auto' }}
          >
          {/* Generate options dynamically */}
          
          <MenuItem value=""></MenuItem>
          {filteredOptions.map((option) => (
          <MenuItem key={option} value={option}>
          {option}
          </MenuItem>
          ))}
          </Select>

        </Toolbar>
      </AppBar>
      
      <Drawer variant="permanent" open={open} style={{ backgroundColor: '#f1f1f1' }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />        
        <List>
          {dashboardtype === 'Customer' && (
            renderListItems(['Product Orders','Service Orders', 'Profile', 'Account'])
          )}

          {dashboardtype === 'Merchant' && (
            renderListItems(['Business', 'Products || Services', 'Product Orders','Service Orders', 'Profile', 'Account'])
          )}

          {dashboardtype === 'Admin' && (
            renderListItems(['Accounts', 'Business', 'Products || Services', 'Product Orders','Service Orders', 'Profile', 'Settings'])
          )}
        </List>
        <Divider />
        {/* <List>
          {renderListItems(['All mail', 'Trash', 'Spam'])}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Breadcrumb/>
        <Box mt={2}>{children}</Box>
         
        {/* <MerchantDashboard/> */}
        
      </Box>
    </Box>
  );
}
