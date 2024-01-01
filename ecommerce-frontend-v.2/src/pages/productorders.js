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
    field: 'product_image',
    headerName: 'Image',
    width: 120,
    renderCell: (params) => (
      <img src={params.value} alt="" style={{ width: '50px', height: '50px' }} />
    ),
  },
  
  { field: 'product_title', headerName: 'Name', width: 150 },
  { field: 'customer_name', headerName: 'Customer Name', width: 150 },
  { field: 'customer_phone', headerName: 'Customer Phone', width: 150 },
  { field: 'business_name', headerName: 'Business', width: 150 },
  { field: 'business_phonenumber', headerName: 'Business Phone', width: 150 },
  { field: 'product_serial', headerName: 'Product Serial', width: 150 },
  { field: 'created', headerName: 'Created', width: 200 },
  { field: 'updated', headerName: 'Updated', width: 200 },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

export default function ProductOrderTable() {
  const [orders, setOrders] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const { authTokens,dashboardtype , logoutUser, apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const[followurl,setFollowurl]=useState("")

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };
  

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    const productName = selectedProduct.product_serial; // Assuming the product object has a 'name' property
    navigate(`/dashboard/product/detail/${productName}`);
  };

  useEffect(() => {
    let followUrl ="admin/product_orders";
    if (dashboardtype === "Customer") {
       navigate("/dashboard");
    } else if (dashboardtype === "Merchant") {
        navigate("/dashboard");
    } 
     

    if (followUrl) {
      setFollowurl(followUrl);

      // Fetch data based on the followUrl
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
      };

      fetch(`${apiUrl}/api/${followUrl}/`, requestOptions)
        .then((response) => {
          if (response.status === 400) {
            return response.json().then((data) => {});
          } else if (response.status === 200) {
            return response.json().then((data) => {
              const ordersWithId = data.map((product, index) => ({ id: index + 1, ...product }));
              setOrders(ordersWithId);
              setFilteredRows(ordersWithId);
            });
          } else if (response.statusText === 'Unauthorized') {
            logoutUser();
          } else {
            return response.json();
          }
        })
        .catch((error) => console.error(error));
    }
  }, [dashboardtype]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = orders.filter(
      (product) =>
        product.app_name.toLowerCase().includes(keyword) ||
        product.customer_name.toLowerCase().includes(keyword) ||
        product.customer_phone.toLowerCase().includes(keyword) ||
        product.business_name.toLowerCase().includes(keyword) ||
        product.business_phonenumber.toLowerCase().includes(keyword) ||
        product.product_serial.toLowerCase().includes(keyword) ||
        product.product_title.toLowerCase().includes(keyword)
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
        rows={filteredRows}
        columns={columns}
        autoHeight
        pageSize={10}
        onRowClick={(params) => handleRowClick(params.row)}
        pagination
      />

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Proceed to {selectedProduct && selectedProduct.title} Detail Page?</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
