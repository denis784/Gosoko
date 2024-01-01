import React, { useState, useContext,useEffect } from 'react';
import {  Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import { AuthContext } from '../auth/auth';


const BusinessPage = () => {
  const [formData, setformData] = useState({
    name: '',
    address: '',
    phone_number: '',
    email: '',
    website: '',
    description: '',
    industry: '',
    founded_in: '',
    employee_count: 0,
    id_number: '',
    kra_pin: '',
    bs_reg_number: '',
    bs_permit_number: '',
    ceritificate_of_registration: null,
    id_attachment: null,
    business_permit: null,
    kra_pin_attachment: null,
  });
  const { authTokens, logoutUser,apiUrl} = useContext(AuthContext);
  const [errors, seterrors] = useState({})
  const [success, setsuccess] = useState({})
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };
    fetch(`${apiUrl}/api/business/get/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
            
          return response.json().then((data) => {seterrors(data)});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setformData({
              name: data.name,
              address: data.address,
              phone_number:data.phone_number,
              email: data.email,
              website: data.website,
              description: data.description,
              industry: data.industry,
              employee_count: data.employee_count,
              id_number: data.id_number,
              kra_pin: data.kra_pin,
              bs_reg_number: data.bs_permit_number,
              bs_permit_number: data.bs_permit_number,
              
            });
            console.log('fresh data for business' ,data)
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else if (response.status === 404) {
          return response.json().then((data) => {seterrors(data)});
          
        }
        else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []); 
  
  return (
    <Card elevation={3}>
      <CardContent >
      <Typography variant="h6" component="h4" color= 'red '>
              Business Details 
        </Typography>


          {
              errors.detail&& (
              <Typography variant="h5" component="h4" color= 'red '>
              {errors.detail}
              </Typography>
              )
          }
          {
            !errors.detail && (
              <>
                {Object.keys(formData).map((key) => (
                  <Typography key={key} color="text.secondary" sx={{ mb: 2 }}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}: {formData[key]}
                  </Typography>
                  ))}
              </>   

            )
          }     
            
      </CardContent>
      {errors.detail && (
        <>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Link to="/dashboard/create">
                <Button variant="contained" sx={{ bgcolor: 'success.main' }} endIcon={<AddIcon />}>
                  Register
                </Button>
              </Link>
           </CardActions>

        </>

      )}
      {!errors.detail && (
        <>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Link to="/dashboard/create">
                <Button variant="contained" sx={{ bgcolor: 'success.main' }} endIcon={<EditIcon />}>
                  Edit Profile
                </Button>
              </Link>
           </CardActions>

        </>

      )}
      
       
    </Card>
  );
};

export default BusinessPage;
