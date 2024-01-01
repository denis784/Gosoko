import React, { useState, useContext, useEffect } from 'react';
import MultiLevelSidebar from './sidebar';
import {
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useParams } from 'react-router-dom';
import SearchBar from './searchcomponent';
import { AuthContext } from '../auth/auth';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#f1f1f1',
    // Add margin bottom to create space between headers
  },
}));

const TrialNavbar = () => {
  const [sidebarData, setSidebarData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSearchBar, showSearchBar, apiUrl } = useContext(AuthContext);
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    fetch(`${apiUrl}/api/sidebar/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSidebarData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={classes.header} style={{ backgroundColor: '#f1f1f1' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <MultiLevelSidebar
          data={sidebarData}
          open={isSidebarOpen}
          onClose={toggleSidebar}
        />
        {location.pathname.includes('login') ||
        location.pathname.includes('cart') ||
        location.pathname.includes('dashboard') ||
        location.pathname.includes('register') ||
        location.pathname.includes('forgotPassword') ||
        location.pathname.includes('resetPassword') ||
        location.pathname.includes('wishlist') ||
        location.pathname.includes('verify') ||
        location.pathname.includes('Register') ||
        !showSearchBar ? null : (
          <SearchBar />
        )}
      </Toolbar>
    </header>
  );
};

export default TrialNavbar;
