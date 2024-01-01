import React, { useState, useContext, useEffect } from 'react';
import {  TextField,  FormControl,  MenuItem,  Select,  Box,  Button,  FormControlLabel,
  Checkbox,
  InputLabel,
} from '@mui/material';
import { AuthContext } from '../auth/auth';


const ProductServicePage = () => {
  const [postData, setPostData] = useState({});
  const [updateData,setUpdateDat]=useState({});
  const { updateCategoryName } = useContext(AuthContext);
  const { authTokens, logoutUser,apiUrl } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});  
  const [selectedType, setSelectedType] = useState('');
  const [selectedAppName, setSelectedAppName] = useState('');
  const [dynamicFields, setDynamicFields] = useState([]);
  const [nestedFields, setNestedFields] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedChosenType, setSelectedChosenType] = useState('');
  const [showRemainingFields, setShowRemainingFields] = useState(false);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');


  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    setSelectedAppName('');
    setSelectedCategory('');
    setSelectedSubcategory(''); 
    setSelectedCounty('');
    setSelectedRegion('');
    setTypes([]);
    setDynamicFields([]);
    setShowRemainingFields(false);
    setPostData((prevFormData) => ({
      ...prevFormData,
      selectedType: selectedType,
      selectedAppName: '',
      selectedCategory: '',
      selectedSubcategory: '',
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
    }));    
  
    if (data[selectedType]) {
      const appData = data[selectedType].find((item) => item.app_name === selectedAppName);
      if (appData) {
        const selectedCategoryObj = appData.models[0].related_objects.category.find(
          (category) => category.category === selectedCategory
        );
        if (selectedCategoryObj) {
          const selectedSubcategoryObj = selectedCategoryObj.subcategories.find(
            (subcategory) => subcategory.subcategory === selectedSubcategory
          );
          if (selectedSubcategoryObj) {
            setTypes(selectedSubcategoryObj.types);
            populateFields(selectedAppName);
          }
        }
      }
    }
  };
  useEffect(() => {
    console.log(postData); // Log the postData value whenever it changes
  }, [postData]);
  
  
  
  const handleAppNameChange = (event) => {
    const selectedAppName = event.target.value;
    setSelectedAppName(selectedAppName);
    setSelectedCategory('');
    setSelectedSubcategory(''); 
    setSelectedSubcategory(''); 
    setSelectedCounty('');
    setSelectedRegion('');
    setTypes([]);
    setDynamicFields([]);
    setShowRemainingFields(false);
    setPostData((prevFormData) => ({
      ...prevFormData,
      selectedAppName: selectedAppName,
      selectedCategory: '',
      selectedSubcategory: '',
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
    }));
      
    if (data[selectedType]) {
      const appData = data[selectedType].find((item) => item.app_name === selectedAppName);
      if (appData) {
        setCategories(appData.models[0].related_objects.category);
        setCounties(appData.models[0].related_objects.region)
        populateFields(selectedAppName);
      }
    }
  };  
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setSelectedSubcategory(''); 
    setTypes([]);
    setDynamicFields([]);
    setShowRemainingFields(false);
    setPostData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategory,
      selectedSubcategory: '',
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
    }));
     
    
    if (data[selectedType]) {
      const appData = data[selectedType].find((item) => item.app_name === selectedAppName);
      if (appData) {
        const selectedCategoryObj = appData.models[0].related_objects.category.find(
          (category) => category.category === selectedCategory
        );
        if (selectedCategoryObj) {
          setSubcategories(selectedCategoryObj.subcategories);
        }
      }
    }
  };  
  const handleSubcategoryChange = (event) => {
    const selectedSubcategory = event.target.value;
    setSelectedSubcategory(selectedSubcategory); 
    setTypes([]);
    setDynamicFields([]); 
    setShowRemainingFields(false);
    setPostData((prevFormData) => ({
      ...prevFormData,
      subcategory: selectedSubcategory,
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
    }));
    
    if (data[selectedType]) {
      const appData = data[selectedType].find((item) => item.app_name === selectedAppName);
      if (appData) {
        const selectedSubcategoryObj = appData.models[0].related_objects.category
          .find((category) => category.category === selectedCategory)
          .subcategories.find((subcategory) => subcategory.subcategory === selectedSubcategory);
        if (selectedSubcategoryObj) {
          setTypes(selectedSubcategoryObj.types); // Fixed: Update 'types' state
          populateFields(selectedAppName);
        }
      }
    }
  };
  const handleCountyChange = (event) => {
    const selectedCounty = event.target.value;
    setSelectedCounty(selectedCounty);
    setSelectedSubCounty('');
    setSelectedRegion('');
  
    if (data[selectedType]) {
      const appData = data[selectedType].find((item) => item.app_name === selectedAppName);
      if (appData) {
        const selectedCountyObj = appData.models[0].related_objects.region.find(
          (county) => county.county === selectedCounty
        );
        if (selectedCountyObj) {
          setSubCounties(selectedCountyObj.subcounties); // Corrected: Update 'subcounties' state
        }
      }
    }
  };
  
  
  const handleSubCountyChange = (event) => {
    const selectedSubCounty = event.target.value;
    setSelectedSubCounty(selectedSubCounty);
    setSelectedRegion('');
  
    if (data[selectedType]) {
      const appData = data[selectedType].find((item) => item.app_name === selectedAppName);
  
      if (appData && appData.models[0].related_objects.region) {
        const selectedCountyObj = appData.models[0].related_objects.region.find(
          (region) => region.county === selectedCounty
        );
  
        if (selectedCountyObj) {
          const selectedSubCountyObj = selectedCountyObj.subcounties.find(
            (subcounty) => subcounty.subcounty === selectedSubCounty
          );
  
          if (selectedSubCountyObj) {
            setRegions(selectedSubCountyObj.regions);
          }
        }
      }
    }
  };  
  
  const handleRegionChange = (event) => {
    const chosen=event.target.value
    setSelectedRegion(chosen);
    setPostData((prevFormData) => ({
      ...prevFormData,
      region: chosen,
      
    }));
  };
    
  const populateFields = (appName) => {
    const selectedProduct = data[selectedType].find((product) => product.app_name === appName);  
    if (selectedProduct) {
      const fields = selectedProduct.models[0].fields
        .filter((field) => !['region','category', 'subcategory', 'type'].includes(field))
        .map((field) => {
          let type = 'text';
          let options = null;
  
          if (field.toLowerCase().includes('image')) {
            type = 'attachment';
          } else if (field.toLowerCase().includes('is') || field.toLowerCase().includes('negotiable')) {
            type = 'checkbox';
          } else {
            const relatedObjectField = Object.keys(selectedProduct.models[0].related_objects).find(
              (relatedField) => field.toLowerCase() === relatedField.toLowerCase()
            );
  
            if (relatedObjectField) {
              type = 'select';
  
              const relatedOptions = selectedProduct.models[0].related_objects[relatedObjectField];
              options = relatedOptions.map((option) => (option.name ? option.name : option));
            }
          }
  
          return {
            name: field,
            type: type,
            options: options,
          };
        });
      setDynamicFields(fields);
    }
  };  

  const handleChosenTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedChosenType([selectedType]);
    setPostData((prevFormData) => ({
      ...prevFormData,
      type: selectedType,
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
    }));
    
    setShowRemainingFields(true);
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, files, type, value, checked } = event.target;
  
    // Check if it's a file input
    if (type === 'file') {
      // Check if any file is selected
      if (files && files.length > 0) {
        const selectedFile = files[0];
        const allowedExtensions = ['.jpg', '.jpeg', '.heic', '.webp'];
        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.'));
  
        // Check if the file extension is allowed
        if (allowedExtensions.includes(fileExtension.toLowerCase())) {
          setPostData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedFile,
          }));
          alert(`Selected file: ${selectedFile.name}`);
        } else {
          // Invalid file type
          event.target.value = null;
          alert('Invalid file type. Only JPG, JPEG, HEIC, and WEBP images are allowed.');
        }
      }
    } else {
      // Handle other input types
      let fieldValue = value;
      if (type === 'checkbox') {
        fieldValue = checked;
      }
      setPostData((prevFormData) => ({
        ...prevFormData,
        [name]: fieldValue,
      }));
    }
  
     // Clear the field value
  };  
    
  const handleSubmit = (event) => {
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
        'Authorization': `Bearer ${authTokens.access}`,
      },
      body: formdata,
    };
  
    fetch(`${apiUrl}/api/appliances/create/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            // Handle success scenario
          });
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${apiUrl}/api/productsandservices/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setData(data);
          });
        } else if (response.status === 403) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 405) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else {
          return response.json();
        }
      })
      
  }, []);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${apiUrl}/api/products/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setData(data);
          });
        } else if (response.status === 403) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else if (response.status === 405) {
          return response.json().then((data) => {
            setErrors(data);
          });
        } else {
          return response.json();
        }
      })
      
  }, []);


  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data' >
      <Box>
        <FormControl fullWidth>
          <Select value={selectedType} onChange={handleTypeChange}>
            <MenuItem value="">Select Product or Service</MenuItem>
            <MenuItem value="products">Product</MenuItem>
            <MenuItem value="services">Service</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {selectedType && ( 
        <Box>
        <TextField
          fullWidth
          select
          label="App Name"
          value={selectedAppName}
          onChange={handleAppNameChange}
          error={Boolean(errors.appname)}
          helperText={errors.appname}
        >
          {data[selectedType] &&
            data[selectedType].map((item) => (
              <MenuItem key={item.app_name} value={item.app_name}>
                {updateCategoryName(item.app_name)}
              </MenuItem>
            ))}
        </TextField>
      </Box>
      )}

      {selectedAppName && categories.length > 0 && (
        
        <Box>
          <TextField
            fullWidth
            select
            label="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            name="category"
            error={Boolean(errors.category)}
            helperText={errors.category}
          >
            {categories.map((category) => (
              <MenuItem key={category.category} value={category.category}>
                {category.category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
              
      )}

      {selectedCategory && subcategories.length > 0 && (
        <Box>
        <TextField
          fullWidth
          select
          label="Subcategory"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          error={Boolean(errors.subcategory)}
          helperText={errors.subcategory}
        >
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory.subcategory} value={subcategory.subcategory}>
              {subcategory.subcategory}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      )}

      {selectedSubcategory && types.length > 0 && (
        <Box>
        <TextField
          fullWidth
          select
          variant="outlined"
          label="Type"
          value={selectedChosenType}
          onChange={handleChosenTypeChange}
          error={errors.type ? true : false}
          helperText={errors.type ? errors.type : ''}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      
      )}

      {showRemainingFields &&
        dynamicFields.map((field) => (
          <Box key={field.name}>
            {field.type === 'attachment' && (
            <input
            type="file"
            name={field.name}
            label={field.name}
            onChange={handleInputChange}
            accept="image/jpeg,image/png,image/heic"
            error={errors[field.name] ? true : false}
            helperText={errors[field.name] ? errors[field.name] : ''}
          />
          
          
          )}
            {field.type === 'text' && (
              <TextField
                type="text"
                name={field.name}
                label={field.name}
                fullWidth
                variant="outlined"
                error={errors[field.name] ? true : false}
                helperText={errors[field.name] ? errors[field.name] : ''}
                value={postData[field.name] || ''}
                onChange={handleInputChange}
              />
            )}
             {field.type === 'select' && (
              <FormControl fullWidth>
                <InputLabel>{field.name}</InputLabel>
                <Select
                  value={postData[field.name] || ''}
                  onChange={handleInputChange}
                  name={field.name}
                  error={errors[field.name] ? true : false}
                  helperText={errors[field.name] ? errors[field.name] : ''}
                >
                  <MenuItem value="">Select an option</MenuItem>
                  {field.options &&
                    field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}


            {field.type === 'number' && (
              <TextField
                type="number"
                name={field.name}
                label={field.name}
                fullWidth
                variant="outlined"
                error={errors[field.name] ? true : false}
                helperText={errors[field.name] ? errors[field.name] : ''}
             
                value={postData[field.name] || ''}
                onChange={handleInputChange}
              />
            )}

            {field.type === 'checkbox' && (
              <FormControlLabel
                control={
                  <Checkbox
                    name={field.name}
                    checked={postData[field.name] || false}
                    onChange={handleInputChange}
                  />
                }
                label={field.name}
              />
            )}


            {/* Add other field types as needed */}
           
          </Box>
        ))}
         {selectedAppName && counties.length > 0 && (
        
        <Box>
          <TextField
            fullWidth
            select
            label="County"
            value={selectedCounty}
            onChange={handleCountyChange}
            name="county"
            error={Boolean(errors.county)}
            helperText={errors.county}
          >
            {counties.map((county) => (
              <MenuItem key={county.county} value={county.county}>
                {county.county}
              </MenuItem>
            ))}
          </TextField>
        </Box>
              
      )}
      {selectedCounty && subCounties.length > 0 && (        
        <Box>
          <TextField
            fullWidth
            select
            label="Sub County"
            value={selectedSubCounty}
            onChange={handleSubCountyChange}
            name="subcounty"
            error={Boolean(errors.subcounty)}
            helperText={errors.subcounty}
          >
            {subCounties.map((subcounty) => (
              <MenuItem key={subcounty.subcounty} value={subcounty.subcounty}>
                {subcounty.subcounty}
              </MenuItem>
            ))}
          </TextField>
        </Box>
              
      )}
      {regions.length > 0 && (
        <Box>
          <TextField
            fullWidth
            select
            label="Region"
            value={selectedRegion}
            onChange={handleRegionChange}
            name="region"
            error={Boolean(errors.region)}
            helperText={errors.region}
          >
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}

         <Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
      </Box>
    </form>
  );
};

export default ProductServicePage;

            

