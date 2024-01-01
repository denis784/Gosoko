import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#f0d9d9',
    padding: '20px 0',
    position: 'relative',
    marginTop: 'auto',
    bottom: 0,
    left: 0,
    width: '100%',
    fontFamily: 'Trebuchet MS, sans-serif',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  },
  footerRow: {
    flexBasis: '25%',
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%',
      marginBottom: '20px',
    },
  },
  footerHeading: {
    fontSize: '1rem', // Increased font size
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  footerLink: {
    textDecoration: 'none',
    color: '#666',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#000',
    },
  },
  externalLink: {
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#000',
    },
  },
}));

function Footer() {
  const classes = useStyles();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const footerLinks = document.querySelectorAll('.footerLink');
    footerLinks.forEach((link) => {
      link.addEventListener('click', scrollToTop);
    });

    return () => {
      footerLinks.forEach((link) => {
        link.removeEventListener('click', scrollToTop);
      });
    };
  }, []);

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.footerContainer}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={3} className={classes.footerRow}>
            <Typography variant="h5">Categories</Typography>
            <List>
              <Link to="/products" className={classes.footerLink}>
                <ListItem button>
                  <ListItemIcon><StorefrontIcon /></ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItem>
              </Link>
              <Link to="/services" className={classes.footerLink}>
                <ListItem button>
                  <ListItemIcon><BusinessCenterIcon /></ListItemIcon>
                  <ListItemText primary="Services" />
                </ListItem>
              </Link>
            </List>
          </Grid>
          <Grid item xs={6} sm={3} className={classes.footerRow}>
            <Typography variant="h5" className={classes.footerHeading}>Customer Service</Typography>
            <List>
              <ListItem button component={Link} to="/faqs" className={classes.footerLink}>
                <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                <ListItemText primary="FAQs" />
              </ListItem>
              <ListItem button component={Link} to="/contactus" className={classes.footerLink}>
                <ListItemIcon><ContactSupportIcon /></ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} sm={3} className={classes.footerRow}>
            <Typography variant="h5" className={classes.footerHeading}>Company</Typography>
            <List>
              <ListItem button component={Link} to="/aboutus" className={classes.footerLink}>
                <ListItemIcon><AccessibilityNewIcon /></ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItem>
              <ListItem button component={Link} to="/terms&conditions" className={classes.footerLink}>
                <ListItemIcon><AccessibilityNewIcon /></ListItemIcon>
                <ListItemText primary="Terms & Conditions" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} sm={3} className={classes.footerRow}>
            <Typography variant="h5" className={classes.footerHeading}>Follow Us</Typography>
            <List>
              <ListItem button className={classes.footerLink}>
                <ListItemIcon><FacebookIcon /></ListItemIcon>
                <ListItemText primary={<a href="https://www.facebook.com/ICTAuthorityKE?_rdc=2&_rdr" target="_blank" rel="noopener noreferrer" className={classes.externalLink}>Facebook</a>} />
              </ListItem>
              <ListItem button className={classes.footerLink}>
                <ListItemIcon><TwitterIcon /></ListItemIcon>
                <ListItemText primary={<a href="https://twitter.com/ICTAuthorityKE" target="_blank" rel="noopener noreferrer" className={classes.externalLink}>Twitter</a>} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
