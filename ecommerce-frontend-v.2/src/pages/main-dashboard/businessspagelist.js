import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, TextField, InputAdornment, Button,  Dialog, DialogTitle, DialogActions  } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { AuthContext } from '../../auth/auth';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'industry', headerName: 'Industry', width: 150 },
  { field: 'kra_pin', headerName: 'KRA PIN', width: 150 },
  { field: 'created', headerName: 'Created', width: 150, valueGetter: (params) => formatDate(params.value) },
  { field: 'updated', headerName: 'Updated', width: 150, valueGetter: (params) => formatDate(params.value) },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

export default function BusinessTable() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const { authTokens, dashboardtype,logoutUser, apiUrl } = useContext(AuthContext);
  const navigate=useNavigate()
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const[followurl,setFollowurl]=useState("")


  const handleRowClick = (business) => {
    setSelectedBusiness(business);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleDialogConfirm = () => {
    const businessName = selectedBusiness.name; // Assuming the business object has a 'name' property
    navigate(`/dashboard/business/detail/${businessName}`);
  };
  
  useEffect(() => {
    let followUrl;
    if (dashboardtype === 'Admin') {
      followUrl = 'admin_business';
    } else  if (dashboardtype === 'Merchant'){
      followUrl  = 'business';
    } else  if (dashboardtype === 'Customer'){
      alert("As a customer,you can view orders you have placed!!")
      navigate('/dashboard')
    }

  
    if (followUrl) {
      setFollowurl(followUrl);
  
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      };
  
      fetch(`${apiUrl}/api/${followUrl}/get/`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              return response.json().then((data) => {});
            } else if (response.status === 401) {
              // Unauthorized, handle accordingly
              logoutUser();
            }
          } else {
            return response.json().then((data) => {
              const businessesWithId = data.map((business, index) => ({ id: index + 1, ...business }));
              setBusinesses(businessesWithId);
              setFilteredRows(businessesWithId);
            });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [apiUrl, authTokens.access, dashboardtype]);
  

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    
    const filtered = businesses.filter(
      (business) =>
        business.name.toLowerCase().includes(keyword) ||
        business.email.toLowerCase().includes(keyword) ||
        business.kra_pin.toLowerCase().includes(keyword) ||
        business.created.toLowerCase().includes(keyword) ||
        business.updated.toLowerCase().includes(keyword)
    );
    
    setFilteredRows(filtered);
  };
  
  

  return (
    <Box height="auto" width="100%">
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      <Grid item>
          <Link to="/dashboard/businesses/create">
            <Button variant="contained" endIcon={<AddIcon />}>
              Create Business
            </Button>
          </Link>
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
      <DialogTitle>Proceed to {selectedBusiness && selectedBusiness.name} Detail Page?</DialogTitle>
          <DialogActions>
            <Button color="error" onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
}
