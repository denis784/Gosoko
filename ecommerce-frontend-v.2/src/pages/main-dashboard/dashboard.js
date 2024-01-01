import { useState } from 'react';
import { styled } from '@mui/material/styles';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from '@mui/icons-material';
import Login from '../Login';
import Profilecomponent from './profilecomponent';
import ProfilePage from './profilecomponent';
import BusinessPage from './businesspage';
import { Inventory } from '@mui/icons-material';
import ProductTable from './products';
import BusinessTable from './businessspagelist';
import ProductsPage from './products';
import OrderTable from './orderstable';




const drawerWidth = 240;

const Root = styled('div')({
  display: 'flex',
});


const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const DrawerContainer = styled('div')(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const DrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
}));

const ToolbarSpacer = styled('div')(({ theme }) => theme.mixins.toolbar);

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState('Profile');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Root>
      <DrawerContainer elevation={3}>
        <ToolbarSpacer />
        <List>
          <ListItem
            button
            selected={activeLink === 'Profile'}
            onClick={() => handleLinkClick('Profile')}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            selected={activeLink === 'Businesses'}
            onClick={() => handleLinkClick('Businesses')}
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Businesses" />
          </ListItem>
          <ListItem
            button
            selected={activeLink === 'Products | Services'}
            onClick={() => handleLinkClick('Products | Services')}
          >
            <ListItemIcon>
            <Inventory />
            </ListItemIcon>
            <ListItemText primary="Products | Services"  />
          </ListItem>
          <ListItem
            button
            selected={activeLink === 'Orders'}
            onClick={() => handleLinkClick('Orders')}
          >
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
      </DrawerContainer>
      <Content>
        <ToolbarSpacer />
        {activeLink === 'Profile' && 
          <ProfilePage/>
        }
        {activeLink === 'Businesses' && 
         <BusinessTable/>
        }
        {activeLink === 'Products | Services' && <ProductsPage/>}
        {activeLink === 'Orders' &&  <OrderTable/>}
      </Content>
    </Root>
  );
};

export default Dashboard;
