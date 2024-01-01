import React, { useState, useContext, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../auth/auth';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const { authTokens, logoutUser, apiUrl } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const navigate = useNavigate();

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
            setProfileData({
              first_name: data.first_name,
              last_name: data.last_name,
              id_number: data.id_number,
              verified: data.verified, // Assuming you have a "verified" field in the response data
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

  return (
    <>
      {profileData.verified === true && (
        <Box m={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Your profile is Complete
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={() => navigate('/dashboard/businesses/create')}>
                Proceed to create a business
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}

      <Box m={2}>
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
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              First Name: {profileData.first_name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Last Name: {profileData.last_name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              ID Number: {profileData.id_number}
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {profileData.verified === true ? (
              <Link to="/dashboard/profile/edit">
                <Button variant="contained" sx={{ bgcolor: 'success.main' }} endIcon={<EditIcon />}>
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard/profile/edit">
                <Button variant="contained" sx={{ bgcolor: 'success.main' }} endIcon={<EditIcon />}>
                  Complete Profile
                </Button>
              </Link>
            )}
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default ProfilePage;
