import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  IconButton,
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
import ProfileEdit from './profileedit';
import BusinessPageEdit from './businessedit';

import { Inventory } from '@mui/icons-material';




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

const DashboardTwo = () => {
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
            selected={activeLink === 'Products'}
            onClick={() => handleLinkClick('Products')}
          >
            <ListItemIcon>
            <Inventory />
            </ListItemIcon>
            <ListItemText primary="Products" />
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
          <ProfileEdit/>
        }
        {activeLink === 'Businesses' && 
         <BusinessPageEdit/>
        }
        {activeLink === 'Products' && <h1>Products Page</h1>}
        {activeLink === 'Orders' && <h1>Orders Page</h1>}
      </Content>
    </Root>
  );
};

export default DashboardTwo;
