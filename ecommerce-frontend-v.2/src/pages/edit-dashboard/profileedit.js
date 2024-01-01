import React, { useState, useContext, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../auth/auth';

const ProfileEdit = () => {
  const [profileData, setProfileData] = useState({});
  const { authTokens, logoutUser ,apiUrl} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const navigate= useNavigate()

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});  
   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
      body: JSON.stringify(profileData)
    };
    fetch(`${apiUrl}/api/profile/create/`, requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            
          });
        } else if(response.status === 200){
          return response.json().then(data => {          
            alert("profile is complete");
            navigate('/dashboard')


          });          
          
        }else if(response.status === 403){
          return response.json().then(data => {
            setErrors(data);       
          
          });
        }else if(response.status === 405){
          return response.json().then(data => {
            setErrors(data);       
          
          });
        }else {
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };
    fetch(`${apiUrl}/api/profile/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setProfileData(data);
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const fields = [
    { label: 'First Name', name: 'first_name', value: profileData.first_name },
    { label: 'Last Name', name: 'last_name', value: profileData.last_name },
    { label: 'ID Number', name: 'id_number', value: profileData.id_number },
  ];

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" component="h4" color="red">
          Profile
        </Typography>
        {errors.detail && (
          <Typography variant="h5" component="h4" color="red">
            {errors.detail}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={field.value}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleInputChange}
        />
         ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ bgcolor: 'success.main' }} endIcon={<EditIcon />}>
            Submit
          </Button>
          </Box>
        </form>

      </CardContent>      
    </Card>
  );
};

export default ProfileEdit;
