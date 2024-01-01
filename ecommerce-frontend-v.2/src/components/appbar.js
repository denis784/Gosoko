import React,{useState,useContext} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { UserAuth } from '../auth/auth';
import { Link ,useNavigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Compare } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../auth/auth';
import { Dialog,Modal,  DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Login from '../pages/Login';

function PrimarySearchAppBar() {
  const navigate=useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };
  const auth=UserAuth()
  const { logoutUser ,authTokens,open,setOpen,handleModalClose} = useContext(AuthContext);
  const { compareList, setCompareList } = useContext(AuthContext);
  const { cartList, setCartList } = useContext(AuthContext);
  const { favoritesList,setFavoritesList } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = () => {
    if (auth.user) {
      return (
        <>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">Dashboard</MenuItem>
            <MenuItem onClick={logoutUser} color='red' >Logout</MenuItem>
          </Menu>
        </>
      );
    } else {
      return (
        <>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/register">Sign Up</MenuItem>
            <MenuItem onClick={handleOpen} >Login</MenuItem>
          </Menu>
        </>
      );
    }
  };
  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >{auth.user && (
      <>
        
      </>
    )

    }
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{flexGrow: 1, }}>
    <AppBar position="static"  sx={{backgroundColor: '#f1f1f1', color: '#000',  }} >
        <Toolbar>  
          <Box
          sx={{
          display: 'flex',
          alignItems: 'center',
          }}
          >
          <img
          src="./images/Logo.png"
          alt="Logo"
          style={{ height: '50px', marginRight: '1px' }}
          />
          </Box>
          {/* i want to control this flexGrow to change according to screen because  of spcaing how can you do that  */}
          <Box sx={{ flexGrow: { xs: 0.4, sm: 0.7, md: 1 } }} />
          
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <IconButton size="large" color="inherit" sx={{ mr: 2 }} onClick={() => navigate(`cart/`, { replace: true })}>
                  {cartList && cartList.length > 0 ? (
                    <Badge badgeContent={cartList.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  ) : (
                    <ShoppingCartIcon />
                  )}
                </IconButton>

                <IconButton size="large" color="inherit" sx={{ mr: 2 }} onClick={() => navigate(`wishlist/`, { replace: true })}>
                  {favoritesList && favoritesList.length > 0 ? (
                    <Badge badgeContent={favoritesList.length} color="error">
                      <FavoriteIcon />
                    </Badge>
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>

                <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => navigate(`compare/`, { replace: true })}>
                  {compareList && compareList.length > 0 ? (
                    <Badge badgeContent={compareList.length} color="error">
                      <Compare />
                    </Badge>
                  ) : (
                    <Compare/>
                  )}
                </IconButton>

          
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >      

            {authTokens && authTokens.id}
            <AccountCircle />
            
            </IconButton>
                </Box>
            
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Modal open={open} onClose={handleModalClose}>
        <Box sx={{ p: 2, width: 400, bgcolor:  '#f1f1f1', margin: 'auto', marginTop: 10 }}>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
          <Login onClose={handleModalClose} />
        </Box>
      </Modal>
      </AppBar>
      {renderMobileMenu}
      {renderMenu()}
    </Box>
  );
}

export default PrimarySearchAppBar;

