import React from 'react';
import { Container, Typography, Grid, Paper, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: 28, marginBottom: 4 }}>
          Contact Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <LocationOnIcon sx={{ fontSize: 48, color: 'green' }} />
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', marginTop: 2 }}>
              Physical Address
            </Typography>
            <Typography>
              Teleposta Towers, 12th Flr,
            </Typography>
            <Typography>
              Kenyatta Ave., Nairobi, Kenya
            </Typography>
            <Typography>
              P.O Box 27150-00100
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <PhoneIcon sx={{ fontSize: 48, color: 'green' }} />
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', marginTop: 2 }}>
              Phone Numbers
            </Typography>
            <Typography>
              (+254) 20 667 6999
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <EmailIcon sx={{ fontSize: 48, color: 'green' }} />
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', marginTop: 2 }}>
              Email Addresses
            </Typography>
            <Typography>
              info@jikonnectsoko.go.ke
            </Typography>
            <Typography>
              jikonnectsoko@icta.go.ke
            </Typography>
          </Grid>
          {/* Social Media Icons and Links */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', marginTop: 4 }}>
              Connect with Us
            </Typography>
            <IconButton
              href="https://www.facebook.com/ICTAuthorityKE?_rdc=2&_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon sx={{ fontSize: 32, color: 'green' }} />
            </IconButton>
            <IconButton
              href="https://twitter.com/ICTAuthorityKE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon sx={{ fontSize: 32, color: 'green' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactUs;
