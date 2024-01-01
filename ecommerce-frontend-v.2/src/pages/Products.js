import { useState, useEffect ,useContext ,useRef} from 'react';
import { useParams } from 'react-router-dom';
import {  Box,  Button,  Grid,  Typography,Container,  styled,} from '@mui/material';
import { AddShoppingCart, Compare, Favorite, Height, ShowChart, WidthFull } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ProductCard from '../components/productcomponent/product-card';
import { UserAuth,AuthContext } from '../auth/auth';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



// Define custom styles for the filter section
const FilterSection = styled('div')({
  backgroundColor: '#f1f1f1',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '10px',
});

const FilterTitle = styled('h4')({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '8px',
});

const FilterItem = styled('div')({
  marginBottom: '4px',
});

const FilterCheckbox = styled('input')({
  marginRight: '4px',
});

const FilterLabel = styled('label')({
  fontSize: '14px',
});

const FilterSectionButton = styled(Button)({
  marginTop: '8px',
});

const Products = () => {  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [appnames, setAppnames] = useState([]);
  const [types, setTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [county, setCounty] = useState([]);
  const [subcounty, setSubcounty] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedSubcategories, setSelectedSubcategories] = useState(new Set());
  const [selectedAppnames, setSelectedAppnames] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedRegions, setSelectedRegions] = useState(new Set());
  const [selectedSubCounties, setSelectedSubCounties] = useState(new Set());
  const [selectedCounties, setSelectedCounties] = useState(new Set());
  const { appname = '', category = '', subcategory = '', type = '' } = useParams();
  const [products, setProducts] = useState([]);
  const { searchValue, setSearchValue } = useContext(AuthContext);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [sortDirection, setSortDirection] = useState(null);
  const searchValueRef = useRef(searchValue);
  const {setSearchBar,showSearchBar,apiUrl}= useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchValueRef.current = searchValue;
    console.log(searchValue);
  }, [searchValue]);
  useEffect(() => {
    setSearchBar(true)
  }, []);

  const toggleSortDirection = () => {
    if (sortDirection === null) {
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };
  const resetFilters = () => {
    setSelectedPriceRange({});
    setSelectedCategories(new Set());
    setSelectedSubcategories(new Set());
    setSelectedAppnames(new Set());
    setSelectedBrands(new Set());
    setSelectedTypes(new Set());
    setSelectedRegions(new Set());
    setSelectedCounties(new Set());
    setSelectedSubCounties(new Set());

    setSortDirection(null);
  };

  const handlePriceRangeChange = (event, key) => {
    const value = parseFloat(event.target.value);
    setSelectedPriceRange((prevState) => ({
      ...prevState,
      [key]: isNaN(value) ? undefined : value,
    }));
  };
  
  
  
  const handleCategoryChange = (event, category) => {
    const isChecked = event.target.checked;
    const updatedCategories = new Set(selectedCategories);
  
    if (isChecked) {
      updatedCategories.add(category);
    } else {
      updatedCategories.delete(category);
    }
  
    setSelectedCategories(updatedCategories);
  };
  
  const handleSubcategoryChange = (event, subcategory) => {
    const isChecked = event.target.checked;
    const updatedSubcategories = new Set(selectedSubcategories);
  
    if (isChecked) {
      updatedSubcategories.add(subcategory);
    } else {
      updatedSubcategories.delete(subcategory);
    }
  
    setSelectedSubcategories(updatedSubcategories);
  };

  const handleAppnameChange = (event, appname) => {
    const isChecked = event.target.checked;
    const updatedAppnames = new Set(selectedAppnames);  
    if (isChecked) {
      updatedAppnames.add(appname);
    } else {
      updatedAppnames.delete(appname);
    }
  
    setSelectedAppnames(updatedAppnames);
  };
  
  const handleBrandChange = (event, brand) => {
    const isChecked = event.target.checked;    
    const updatedBrands = new Set(selectedBrands);
      if (isChecked) {
      updatedBrands.add(brand);
    } else {
      updatedBrands.delete(brand);
    }  
    setSelectedBrands(updatedBrands);
  };
  
  
  const handleTypeChange = (event, type) => {
    const isChecked = event.target.checked;
    const updatedTypes = new Set(selectedTypes);
  
    if (isChecked) {
      updatedTypes.add(type);
    } else {
      updatedTypes.delete(type);
    }
  
    setSelectedTypes(updatedTypes);
  };
  
  const handleRegionChange = (event, region) => {
    const isChecked = event.target.checked;
    const updatedRegions = new Set(selectedRegions);

    if (isChecked) {
      if (region) {
        updatedRegions.add(region);
      }
    } else {
      updatedRegions.delete(region);
    }

    setSelectedRegions(updatedRegions);
  };
  const handleCountyChange = (event, county) => {
    const isChecked = event.target.checked;
    const updatedCounties = new Set(selectedCounties);  
    if (isChecked) {
      updatedCounties.add(county);
    } else {
      updatedCounties.delete(county);
    }
  
    setSelectedCounties(updatedCounties);
  };
  
  const handleSubCountyChange = (event, subcounty) => {
    const isChecked = event.target.checked;
    const updatedSubCounties = new Set(selectedSubCounties);
  
    if (isChecked) {
      updatedSubCounties.add(subcounty);
    } else {
      updatedSubCounties.delete(subcounty);
    }
  
    setSelectedSubCounties(updatedSubCounties);
  };
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
    appName = appName.replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
  
    return appName;
  };

  

  
  

  useEffect(() => {
    console.log("this is the searchvalue" ,searchValue)
    let url = `${apiUrl}/api/products/${appname}`;
    if (category) {
      url += `/${category}`;
    }
    if (subcategory) {
      url += `/${subcategory}`;
    }
    if (type) {
      url += `/${type}`;
    }
    if (searchValue) {
      url += `?search=${encodeURIComponent(searchValue)}`;
    }
    setIsLoading(true);
    function getRequestOptions(authTokens) {
      const headers = {
        'Content-Type': 'application/json'
      };
    
      if (authTokens) {
        headers.Authorization = `Bearer ${authTokens.access}`;
      }
    
      return {
        method: 'GET',
        headers: headers
      };
    }    
    const requestOptions = getRequestOptions(authTokens);
    fetch(url, requestOptions)
    .then((response) => {
      setIsLoading(false);
      if (response.status === 200) {
        return response.json().then((data) => {
          // Apply filters
          const filteredData = data.filter((product) => {
            const appnameMatch = selectedAppnames.size === 0 || selectedAppnames.has(product.app_name);
            const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(product.category.name);
            const subcategoryMatch = selectedSubcategories.size === 0 || selectedSubcategories.has(product.subcategory.name);
            const typeMatch = selectedTypes.size === 0 || selectedTypes.has(product.type.name);
            const regionMatch = selectedRegions.size === 0 || selectedRegions.has(product.region.name);
            const countyMatch = selectedCounties.size === 0 || selectedCounties.has(product.region.county.name);
            const subcountyMatch = selectedSubCounties.size === 0 || selectedSubCounties.has(product.region.subcounty.name);
            const brandMatch = selectedBrands.size === 0 || (product.brand && selectedBrands.has(product.brand.name));
            

            const priceMatch =
              (selectedPriceRange.min === undefined || product.price >= selectedPriceRange.min) &&
              (selectedPriceRange.max === undefined || product.price <= selectedPriceRange.max);
          
            return appnameMatch && categoryMatch && subcategoryMatch && typeMatch && regionMatch && brandMatch && priceMatch &&countyMatch && subcountyMatch;
          });
          
          filteredData.sort((a, b) => {
            if (sortDirection === 'asc') {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          });         
  
          setProducts(filteredData);
        });
      }else if (response.statusText === 'Unauthorized') {
        logoutUser();
      } 
    },);
  
    // ...rest of the useEffect function...
  }, [appname, category, subcategory, type,selectedBrands, searchValue, selectedCategories, selectedSubcategories,selectedAppnames,selectedRegions,selectedCounties,selectedSubCounties,selectedTypes ,sortDirection ,selectedPriceRange]);
 
  useEffect(() => {
    if (products) {
      const uniqueAppnames = new Set();
      const uniqueCategories = new Set();
      const uniqueSubcategories = new Set();
      const uniqueTypes = new Set();
      const uniqueRegions = new Set();
      const uniqueCountys = new Set();
      const uniqueSubcountys= new Set();
      const uniqueBrands = new Set();
  
      products.forEach((product) => {
        uniqueAppnames.add(product.app_name);
        product.category && uniqueCategories.add(product.category.name);
        product.subcategory && uniqueSubcategories.add(product.subcategory.name);
        product.type && uniqueTypes.add(product.type.name)
        product.region && uniqueRegions.add(product.region.name);
        product.region && uniqueCountys.add(product.region.county.name);
        product.region && uniqueSubcountys.add(product.region.subcounty.name);
        uniqueBrands.add(product.brand ? product.brand.name : "Unknown");

      }); 
      setAppnames(Array.from(uniqueAppnames).map((name) => ({ name })));
      setCategories(Array.from(uniqueCategories).map((name) => ({ name })));
      setSubcategories(Array.from(uniqueSubcategories).map((name) => ({ name })));
      setTypes(Array.from(uniqueTypes).map((name) => ({ name })));
      setRegions(Array.from(uniqueRegions).map((name) => ({ name })));
      setCounty(Array.from(uniqueCountys).map((name) => ({ name })));
      setSubcounty(Array.from(uniqueSubcountys).map((name) => ({ name })));
      setBrands(Array.from(uniqueBrands).map((name) => ({ name })));
    }
  }, [products ]);
  if (!products || products.length === 0) {
    return (
      <div>
        <div style={{ width: '100%', height: '250px' ,backgroundColor: '#f1f1f1', }}>Products loading</div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </div>
    );

  }

  return (
    <Container component="main" maxHeight="100mvh"maxWidth="100%" sx={{ marginTop: '1px' , backgroundColor: '#f1f1f1',}}>
      <Grid container spacing={2} sx={{backgroundColor: '#f1f1f1',}}>
      {/* Filter section */}
      <Grid item xs={3}>
        <FilterSection>
          <FilterTitle>Filters</FilterTitle>
  
          {/* Appname filter */}
          <FilterTitle>Appname</FilterTitle>
          {appnames &&
            appnames
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((appname) => (
                <FilterItem key={appname.name}>
                  <FilterCheckbox
                    type="checkbox"
                    onChange={(e) => handleAppnameChange(e, appname.name)}
                    checked={selectedAppnames.has(appname.name)}
                  />
                  <FilterLabel>{updateCategoryName(appname.name)}</FilterLabel>
                </FilterItem>
              ))}
  
          {/* Category filter */}
          <FilterTitle>Category</FilterTitle>
          {categories &&
            categories.map((category) => (
              <FilterItem key={category.name}>
                <FilterCheckbox
                  type="checkbox"
                  onChange={(e) => handleCategoryChange(e, category.name)}
                  checked={selectedCategories.has(category.name)}
                />
                <FilterLabel>{category.name}</FilterLabel>
              </FilterItem>
            ))}
  
          {/* Subcategory filter */}
          <FilterTitle>Subcategory</FilterTitle>
          {subcategories &&
            subcategories.map((subcategory) => (
              <FilterItem key={subcategory.name}>
                <FilterCheckbox
                  type="checkbox"
                  onChange={(e) => handleSubcategoryChange(e, subcategory.name)}
                  checked={selectedSubcategories.has(subcategory.name)}
                />
                <FilterLabel>{subcategory.name}</FilterLabel>
              </FilterItem>
            ))}
  
          {/* Type filter */}
          <FilterTitle>Type</FilterTitle>
          {types &&
            types.map((type) => (
              <FilterItem key={type.name}>
                <FilterCheckbox
                  type="checkbox"
                  onChange={(e) => handleTypeChange(e, type.name)}
                  checked={selectedTypes.has(type.name)}
                />
                <FilterLabel>{type.name}</FilterLabel>
              </FilterItem>
            ))}
  
          {/* Brand filter */}
          <FilterTitle>Brand</FilterTitle>
          {brands &&
            brands
              .filter((brand) => brand?.name !== 'Unknown')
              .map((brand) => (
                <FilterItem key={brand.name}>
                  <FilterCheckbox
                    type="checkbox"
                    onChange={(e) => handleBrandChange(e, brand?.name)}
                    checked={selectedBrands.has(brand.name)}
                    id={brand?.name}
                  />
                  <FilterLabel htmlFor={brand?.name}>{brand?.name}</FilterLabel>
                </FilterItem>
              ))}
  
          {/* Filter section button */}
          {/* <FilterSectionButton
            variant="contained"
            color="primary"
            onClick={}        
          >
            Apply Filters
          </FilterSectionButton> */}
        </FilterSection>
      </Grid>
  
      {/* Product list */}
      <Grid item xs={9}>
        <Box sx={{ p: 2 }}>
          {products.length > 0 ? (
            <Grid container spacing={2}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">
              The product you are searching for is unavailable.
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>



    </Container>
  );
  
};
export default Products;
