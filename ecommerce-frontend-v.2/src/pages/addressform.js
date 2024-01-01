import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { branchesData } from './posta/data'; // Use branchesData
import PostaAutoComplete from './posta/field';
import {
  GoogleMap,
  LoadScript,
  Autocomplete
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px', // Adjust the height as needed
};

export default function AddressForm({
  locations,
  setLocations,
  setProfileData,
  handleCountyChange,
  handleInputChange,
  selectedCounty,
  selectedSubCounty,
  handleSubCountyChange,
  selectedLocality,
  profileData,
  authTokens,
  logoutUser,
  apiUrl,
  handlePlaceSelect,
  setFormData,
  deliveryOption,
  setDeliveryOption,
  setSelectedCounty,
  setSelectedLocality,
  setSelectedSubCounty
}) {
  const postaKey = process.env.REACT_APP_POSTA_KEY;
  const postaUrl = process.env.REACT_APP_POSTA_URL;
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };
    fetch(`${apiUrl}/api/localities/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            // Update the state with the received data
            setLocations(data);
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };
    fetch(`${apiUrl}/api/profile/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setProfileData({
              first_name: data.first_name,
              last_name: data.last_name,
              id_number: data.id_number,
              phone_number: data.phone_number,
            });
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${postaKey}` },
    };
    fetch(`${postaUrl}`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            console.log('this is posta', data);
          });
        } else if (response.statusText === 'Unauthorized') {
          console.log('posta has not authorized you');
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDDZe20AaxH_oIvJvQcksysTuMHhkf_X50"
      libraries={['places']}
    >
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="first_name" // Update name attribute
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleInputChange}
              value={profileData.first_name || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="last_name" // Update name attribute
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={handleInputChange}
              value={profileData.last_name || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="id"
              name="id_number" // Update name attribute
              label="ID"
              fullWidth
              autoComplete="id-number"
              variant="standard"
              onChange={handleInputChange}
              value={profileData.id_number || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone_number"
              name="phone_number" // Update name attribute
              label="Phone Number"
              fullWidth
              autoComplete="phone_number"
              variant="standard"
              onChange={handleInputChange}
              value={profileData.phone_number || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="county"
              name="county"
              label="County"
              fullWidth
              variant="standard"
              value={selectedCounty}
              onChange={handleCountyChange}
              select
            >
              {locations.map((countyData, index) => (
                <MenuItem key={index} value={countyData.county}>
                  {countyData.county}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="subCounty"
              name="subCounty"
              label="Sub-County"
              fullWidth
              variant="standard"
              value={selectedSubCounty}
              onChange={handleSubCountyChange}
              select
              disabled={!selectedCounty}
            >
              {selectedCounty &&
                locations
                  .filter((countyData) => countyData.county === selectedCounty)
                  .map((countyData) =>
                    countyData.subcounties.map((subCountyData, index) => (
                      <MenuItem key={index} value={subCountyData.subcounty}>
                        {subCountyData.subcounty}
                      </MenuItem>
                    ))
                  )}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="locality"
              name="locality"
              label="Locality"
              fullWidth
              variant="standard"
              value={selectedLocality}
              onChange={(event) => setSelectedLocality(event.target.value)}
              select
              disabled={!selectedSubCounty}
            >
              {selectedCounty &&
                selectedSubCounty &&
                locations
                  .filter((countyData) => countyData.county === selectedCounty)
                  .map((countyData) =>
                    countyData.subcounties
                      .filter(
                        (subCountyData) => subCountyData.subcounty === selectedSubCounty
                      )
                      .map((subCountyData) =>
                        subCountyData.localities.map((localityData, index) => (
                          <MenuItem key={index} value={localityData.locality}>
                            {localityData.locality}
                          </MenuItem>
                        ))
                      )
                  )}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              onLoad={(autocomplete) => {
                // You can access the autocomplete instance here if needed
              }}
              onChange={() => {
                const place = autocomplete.getPlace();
                handlePlaceSelect(place);
              }}
            >
              <TextField
                required
                id="locationsuggestion"
                name="locationsuggestion"
                label="Approximity Location"
                fullWidth
                variant="standard"
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={12}>
            <PostaAutoComplete onChange={(branch) => setFormData({ ...formData, selectedBranch: branch })} />
          </Grid>
          <Grid item xs={12}>
            {/* Delivery Option Selection */}
            <TextField
              required
              id="deliveryOption"
              name="deliveryOption"
              label="Delivery Option"
              fullWidth
              variant="standard"
              select
              value={deliveryOption}
              onChange={(event) => setDeliveryOption(event.target.value)}
            >
              <MenuItem value="Door to Door">Door to Door</MenuItem>
              <MenuItem value="Post Office Collection">Post Office Collection</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </LoadScript>
  );
}
