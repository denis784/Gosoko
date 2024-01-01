import React, { useState, useContext, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputAdornment, IconButton } from '@mui/material';


import { AuthContext } from '../../auth/auth';

const  CreateBusinessPage = () => {
  const [postData, setpostData] = useState({});
  const { authTokens, logoutUser ,apiUrl} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const navigate= useNavigate()

  const handleInputChange = event => {
    const { name, value, type, files } = event.target;
    let fieldValue = value;
    
    // Check if the input field is a file input
    if (type === 'file' && files.length > 0) {
      fieldValue = files[0]; // Store the whole file object
    }
    
    setpostData({
      ...postData,
      [name]: fieldValue
    });
  };
  useEffect(() => {
    console.log(postData);
  }, [postData]);
 

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});
    let formdata = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      formdata.append(key, value);
    });
   
    const requestOptions = {
      method: 'POST',
      headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',
       Authorization: `Bearer ${authTokens.access}` },
      body: formdata
    };
    fetch(`${apiUrl}/api/business/`, requestOptions)
      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);            
          });
        } else if(response.status === 201){
          return response.json().then(data => {          
            alert("Business Created");
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

  
  const fields = [
    { label: 'Business Name', name: 'name', value: postData.name },
    { label: 'Business Email', name: 'email', value: postData.email },
    { label: 'Business Address', name: 'address', value: postData.address },
    { label: 'Business Phone Number', name: 'phone_number', value: postData.phone_number },
    { label: 'Website', name: 'website', value: postData.website },
    { label: 'Description', name: 'description', value: postData.description },
    { label: 'Industry', name: 'industry', value: postData.industry },
    { label: 'Employee Count', name: 'employee_count', value: postData.employee_count },
    { label: 'ID Number', name: 'id_number', value: postData.id_number },
    { label: 'KRA PIN', name: 'kra_pin', value: postData.kra_pin },
    { label: 'Business Registration Number', name: 'bs_reg_number', value: postData.bs_reg_number },
    { label: 'Business Permit Number', name: 'bs_permit_number', value: postData.bs_permit_number },
    {
      label: 'Certificate of Registration',
      name: 'certificate_of_registration',
      type: 'file',
      accept: '.pdf',
       
    },
    {
      label: 'ID Attachment',
      name: 'id_attachment',
      type: 'file',
      accept: '.pdf',
       
    },
    {
      label: 'Business Permit',
      name: 'business_permit',
      type: 'file',
      accept: '.pdf',
       
    },
    {
      label: 'KRA PIN Attachment',
      name: 'kra_pin_attachment',
      type: 'file',
      accept: '.pdf',
    },
  ];


  
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" component="h4" color="red">
          Create Business
        </Typography>
        {errors.detail && (
          <Typography variant="h5" component="h4" color="red">
            {errors.detail}
          </Typography>
        )}
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              error={errors[field.name] ? true : false}
              helperText={errors[field.name] ? errors[field.name][0] : ''}        
              value={field.value}
              type={field.type}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleInputChange}
              InputProps={
                field.type === 'file'
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton component="label">
                            <input
                              type="file"
                              hidden
                              accept={field.accept}
                              name={field.name}
                              onChange={handleInputChange}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : null
              }
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: 'success.main' }}
              endIcon={<EditIcon />}
            >
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
  
};

export default CreateBusinessPage;
