import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, InputAdornment, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../auth/auth';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const updateCategoryName = (appName) => {
    // Word replacements
    if (appName === "cateringandevent") appName = "catering & event";
    else if (appName === "mechanic") appName = "mechanic";
    else if (appName === "beauty") appName = "beauty";
    else if (appName === "computerandit") appName = "computers & it";
    else if (appName === "transportation") appName = "Transport";
    else if (appName === "cleaning") appName = "cleaning";
    else if (appName === "computersandaccessories") appName = "computers & Accessories";
    else if (appName === "tvandaudio") appName = "tvs & Audio";
    else if (appName === "baby_items") appName = "baby items";
    else if (appName === "homeandoffice") appName = "home and office";
    else if (appName === "phoneandtablet") appName = "phones and Tablets";
  
    // Camel casing
    appName = String(appName).replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
  
    return appName;
  };
  

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image1',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <img src={params.value} alt="" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      field: 'app_name',
      headerName: 'App Name',
      width: 150,
      valueGetter: (params) => updateCategoryName(params.value),
    },
    { field: 'title', headerName: 'Name', width: 150 },
    { field: 'category', headerName: 'Category', width: 150, valueGetter: (params) => updateCategoryName(params.row.category?.name) },
    { field: 'subcategory', headerName: 'Subcategory', width: 150, valueGetter: (params) => updateCategoryName(params.row.subcategory?.name) },
    { field: 'type', headerName: 'Type', width: 150, valueGetter: (params) => updateCategoryName(params.row.type?.name) },
    { field: 'currency', headerName: 'Currency', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'created', headerName: 'Created', width: 200 },
    { field: 'updated', headerName: 'Updated', width: 200 },
  ];
  
  // Update valueGetter for columns other than created, updated, and price

    
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
  

export default function ProductAdminTable() {
  const [products, setProducts] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const { authTokens, logoutUser ,apiUrl} = useContext(AuthContext);
  const navigate=useNavigate()
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);


  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleDialogConfirm = () => {
    const productName = selectedProduct.product_serial; // Assuming the product object has a 'name' property
    navigate(`/dashboard/products&services/${productName}`);
  };
  


  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };

    fetch(`${apiUrl}/api/products/admin/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            const productsWithId = data.map((product, index) => ({ id: index + 1, ...product }));
            setProducts(productsWithId);
            setFilteredRows(productsWithId);
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.app_name.toLowerCase().includes(keyword) ||
        product.category.name.toLowerCase().includes(keyword) ||
        product.subcategory.name.toLowerCase().includes(keyword) ||
        product.type.name.toLowerCase().includes(keyword) ||
        product.price.toLowerCase().includes(keyword)||
        product.title.toLowerCase().includes(keyword)
    );
    setFilteredRows(filtered);
  };
  return (
    <Box height="auto" width="75%">
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>        
        <Grid item>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
    </Grid>

    <DataGrid       
        initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        }}
        rows={filteredRows}
        onRowClick={(params) => handleRowClick(params.row)}
        columns={columns}
        autoHeight       
        pageSizeOptions={[5, 10, 25,40]}
        paginationMode='client'
        pagination={true}
        
    />
     <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Proceed to {selectedProduct && selectedProduct.title} Detail Page?</DialogTitle>
          <DialogActions>
            <Button color="error" onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
}
