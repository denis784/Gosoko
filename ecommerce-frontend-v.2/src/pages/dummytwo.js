import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  InputLabel,
} from '@mui/material';
import { AuthContext } from '../auth/auth';

const ProductServicePage = () => {
  const [formData, setFormData] = useState({});
  const { updateCategoryName ,apiUrl} = useContext(AuthContext);
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
  const [showRemainingFields, setShowRemainingFields] = useState(false);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedAppName('');
    setCategories([]);
    setSubcategories([]);
    setTypes([]);
    setFormData({});
    setShowRemainingFields(false);
  };

  const handleAppNameChange = (event) => {
    const selectedAppName = event.target.value;
    setSelectedAppName(selectedAppName);
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedType('');
   
  };

  const handleCategoryChange = (event) => {
  const selectedCategory = event.target.value;
  setSelectedCategory(selectedCategory);
  setSelectedSubcategory('');
  setSelectedType('');
  setFormData({});
  setShowRemainingFields(false);
};

const handleSubcategoryChange = (event) => {
  const selectedSubcategory = event.target.value;
  setSelectedSubcategory(selectedSubcategory);
  setSelectedType('');
  setFormData({});
  setShowRemainingFields(false);
};


  const handleTypeSelect = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    setShowRemainingFields(true);
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    let fieldValue = value;
    if (type === 'checkbox') {
      fieldValue = checked;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
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
        } else {          return response.json();
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
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
          <FormControl fullWidth>
            <InputLabel>App Name</InputLabel>
            <Select value={selectedAppName} onChange={handleAppNameChange}>
              {data[selectedType] &&
                data[selectedType].map((item) => (
                  <MenuItem key={item.app_name} value={item.app_name}>
                    {updateCategoryName(item.app_name)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {selectedAppName && !selectedCategory && (
        <Box>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              {data[selectedType] &&
                data[selectedType].map((item) => {
                  if (item.app_name === selectedAppName) {
                    return item.models[0].related_objects.category.map((category) => (
                      <MenuItem key={category.category} value={category.category}>
                        {category.category}
                      </MenuItem>
                    ));
                  }
                  return null;
                })}
            </Select>
          </FormControl>
        </Box>
      )}

      {selectedCategory && (
        <>
          <Box>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                {data[selectedType] &&
                  data[selectedType].map((item) => {
                    if (item.app_name === selectedAppName) {
                      const selectedCategoryObj = item.models[0].related_objects.category.find(
                        (cat) => cat.category === selectedCategory
                      );
                      if (selectedCategoryObj) {
                        return selectedCategoryObj.subcategories.map((subcategory) => (
                          <MenuItem key={subcategory.subcategory} value={subcategory.subcategory}>
                            {subcategory.subcategory}
                          </MenuItem>
                        ));
                      }
                    }
                    return null;
                  })}
              </Select>
            </FormControl>
          </Box>

          {selectedSubcategory && (
            <Box>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={selectedType} onChange={handleTypeSelect}>
                  {data[selectedType] &&
                    data[selectedType].map((item) => {
                      if (item.app_name === selectedAppName) {
                        const selectedCategoryObj = item.models[0].related_objects.category.find(
                          (cat) => cat.category === selectedCategory
                        );
                        if (selectedCategoryObj) {
                          const selectedSubcategoryObj = selectedCategoryObj.subcategories.find(
                            (subcat) => subcat.subcategory === selectedSubcategory
                          );
                          if (selectedSubcategoryObj) {
                            return selectedSubcategoryObj.types.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ));
                          }
                        }
                      }
                      return null;
                    })}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {showRemainingFields && dynamicFields.map((field) => (
        <Box key={field.name}>
          {field.type === 'attachment' && (
            <TextField
              type="file"
                name={field.name}
                label={field.name}
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
                accept="image/*"
              />
            )}
  
            {field.type === 'text' && (
              <TextField
                type="text"
                name={field.name}
                label={field.name}
                fullWidth
                variant="outlined"
                value={formData[field.name] || ''}
                onChange={handleInputChange}
              />
            )}
  
            {field.type === 'number' && (
              <TextField
                type="number"
                name={field.name}
                label={field.name}
                fullWidth
                variant="outlined"
                value={formData[field.name] || ''}
                onChange={handleInputChange}
              />
            )}
  
            {field.type === 'checkbox' && (
              <FormControlLabel
                control={
                  <Checkbox
                    name={field.name}
                    checked={formData[field.name] || false}
                    onChange={handleInputChange}
                  />
                }
                label={field.name}
              />
            )}
  
            {/* Add other field types as needed */}
          </Box>
        ))}
      </form>
    );
  };
  
  export default ProductServicePage;
  

