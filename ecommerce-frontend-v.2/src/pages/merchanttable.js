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
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'phone_number', headerName: 'Phone Number', width: 150, valueGetter: (params) => params.value || '-' },
  { field: 'merchant_name', headerName: 'Customer Name', width: 150, valueGetter: (params) => params.value || '-' },
  // ... (existing columns)
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

export default function MerchantTable() {
  const [products, setProducts] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const { authTokens, dashboardtype, logoutUser, apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();
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
    if (selectedProduct) {
      // Assuming "id" is the unique identifier for the product
      navigate(`/dashboard/product/detail/${selectedProduct.id}`);
    }
    setDialogOpen(false);
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };

    fetch(`${apiUrl}/api/admin_merchants/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => []);
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
  }, [authTokens.access, apiUrl, logoutUser]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.username.toLowerCase().includes(keyword) ||
        product.phone_number.toLowerCase().includes(keyword) ||
        product.merchant_name.toLowerCase().includes(keyword) 
    );
    setFilteredRows(filtered);
  };

  return (
    <Box height="auto" width="75%">
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>        
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
        pageSizeOptions={[5, 10, 25, 40]}
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
