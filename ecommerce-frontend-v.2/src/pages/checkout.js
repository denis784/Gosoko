import React, {useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './addressform';
import PaymentForm from './paymentform';
import Review from './review';
import { AuthContext } from '../auth/auth';

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [locations, setLocations] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [formData, setFormData] = useState({}); // State to store form data
  const { authTokens, logoutUser, apiUrl } = useContext(AuthContext);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchSuggestions, setBranchSuggestions] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('Door to Door'); // Added delivery option state

  const [phoneNumber, setPhoneNumber] = React.useState('');
  // Handle changes to form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountyChange = (event) => {
    const county = event.target.value;
    setSelectedCounty(county);
    setSelectedSubCounty('');
    setSelectedLocality('');
  };

  const handleSubCountyChange = (event) => {
    const subcounty = event.target.value;
    setSelectedSubCounty(subcounty);
    setSelectedLocality('');
  };

  // This function will be called when a place is selected from the autocomplete suggestions
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);

    // Get latitude and longitude of the selected place
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
  };


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm
        selectedPlace={selectedPlace}
        profileData={profileData}
        setLocations={setLocations}
        setProfileData={setProfileData}
        locations={locations}
        setSelectedCounty={setSelectedCounty} 
        setSelectedLocality={setSelectedLocality}
        setSelectedSubCounty ={setSelectedSubCounty}
        selectedCounty={selectedCounty}
        selectedSubCounty={selectedSubCounty}
        setDeliveryOption={setDeliveryOption}
        selectedLocality={selectedLocality}
        formData={formData}
        authTokens={authTokens}
        logoutUser={logoutUser}
        apiUrl={apiUrl}
        selectedBranch={selectedBranch}
        branchSuggestions={branchSuggestions}
        deliveryOption={deliveryOption}
        handleInputChange={handleInputChange}
        handleCountyChange={handleCountyChange}
        handleSubCountyChange={handleSubCountyChange}
        handlePlaceSelect={handlePlaceSelect}
      />;
      case 1:
        return <PaymentForm
       phoneNumber={phoneNumber} 
       setPhoneNumber={setPhoneNumber}
        
        />;
      case 2:
        return <Review 
        selectedPlace={selectedPlace}
        profileData={profileData}      
        locations={locations}        
        selectedCounty={selectedCounty}
        selectedSubCounty={selectedSubCounty}
        selectedLocality={selectedLocality}
        formData={formData}
        authTokens={authTokens}
        logoutUser={logoutUser}
        apiUrl={apiUrl}
        selectedBranch={selectedBranch}
        branchSuggestions={branchSuggestions}
        deliveryOption={deliveryOption}
        phoneNumber={phoneNumber} 


        />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ marginBottom: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {' © '}
            <Link color="inherit" href="https://www.icta.go.ke/">
              {new Date().getFullYear()} Copyright ICT Authority. All Rights Reserved.
            </Link>
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Checkout;
