import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  aboutUsContainer: {
    backgroundColor: '#f5f5f5',
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'MarketingFont, sans-serif',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  subheading: {
    fontFamily: 'MarketingFont, sans-serif',
    fontSize: '1.2rem',
    margin: '1rem 0',
  },
  icon: {
    fontSize: '2rem',
    marginRight: '0.5rem',
  },
  button: {
    margin: '1rem',
  },
}));

const AboutUsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutUsContainer}>
      <Typography variant="h1" className={classes.heading}>
        ABOUT JIKONNECTSOKO E-COMMERCE PLATFORM
      </Typography>
      <Typography variant="body1" className={classes.subheading}>
        JiKonnectsoko is an e-commerce platform developed by the Ministry of Information Communication and the Digital Economy and implemented by the ICT Authority to help stimulate the digital economy by enabling SMEs to expand their customer reach and move their businesses online. This marketplace enables entrepreneurs and businesses to increase their customer base therefore increasing their profit margins as their products and services will be accessible nationally regardless of the business location.
      </Typography>
      <Typography variant="body1" className={classes.subheading}>
        JiKonnectsoko is currently being offered as a FREE service to sellers and buyers; and is being rolled out as a value-added service to the Countrywide government public Wi-Fi initiative being deployed. JiKonnectsoko serves as a catalyst for economic growth and digital transformation. It provides a remarkable opportunity for SMEs to embrace the online landscape, reach a wider audience, and engage in seamless transactions.
      </Typography>
      <Typography variant="body1" className={classes.subheading}>
        JiKonnectsoko provides a user-friendly interface that ensures a smooth and enjoyable shopping experience. Customers can browse the platform with ease and make hassle-free purchases of their desired products or services through their phone or computer.
      </Typography>
      <Typography variant="body1" className={classes.subheading}>
        On the other hand, merchants have access to advanced reporting features to monitor their business performance and track sales, gaining valuable insights to enhance strategies and make data-driven decisions.
      </Typography>
      <Button variant="contained" color="primary" className={classes.button}>
        Get Started
        <Icon className={classes.icon}>arrow_forward</Icon>
      </Button>
    </div>
  );
};

export default AboutUsPage;
