import React, { useState, useContext, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate ,useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/auth';


const  BusinessPageEdit = () => {
  const [formData, setformData] = useState({});
  const { authTokens, logoutUser ,apiUrl} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const { businessname = '' } = useParams();
  const navigate= useNavigate()

  const handleInputChange = event => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});  
    
    let formdata = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formdata.append(key, value);
    });
   
    const requestOptions = {
      method: 'PUT',
      headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',
       Authorization: `Bearer ${authTokens.access}` },
      body: formdata
    };
    fetch(`${apiUrl}/api/business/edit/${businessname}/`, requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            
          });
        } else if(response.status === 200){
          return response.json().then(data => {          
            alert("business information updated");
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
      headers: { 
        'Content-Type': 'application/json',
         Authorization: `Bearer ${authTokens.access}` },
    };
    fetch(`${apiUrl}/api/business/get/${businessname}/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setformData(data[0]);

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
    { label: 'Business Name', name: 'name', value: formData.name || '' },
    { label: 'Business Email', name: 'email', value: formData.email || '' },
    { label: 'Business Address', name: 'address', value: formData.address || '' },
    { label: 'Business Phone Number', name: 'phone_number', value: formData.phone_number || '' },
    { label: 'Website', name: 'website', value: formData.website || '' },
    { label: 'Description', name: 'description', value: formData.description || '' },
    { label: 'Industry', name: 'industry', value: formData.industry || '' },
    { label: 'Employee Count', name: 'employee_count', value: formData.employee_count || '' },
    { label: 'ID Number', name: 'id_number', value: formData.id_number || '' },
    { label: 'KRA PIN', name: 'kra_pin', value: formData.kra_pin || '' },
    { label: 'Business Registration Number', name: 'bs_reg_number', value: formData.bs_reg_number || '' },
    { label: 'Business Permit Number', name: 'bs_permit_number', value: formData.bs_permit_number || '' },
  ];
  
  

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" component="h4" color="red">
          Edit Business Details
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
          value={formData[field.name] || ''}
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

export default BusinessPageEdit;
