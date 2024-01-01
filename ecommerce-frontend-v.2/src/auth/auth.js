import React,{ createContext,useContext, useState ,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate ,useLocation} from 'react-router-dom'

const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const apiUrl = process.env.REACT_APP_API_URL;   
    let [searchValue, setSearchValue] = useState(() => {
        const value = localStorage.getItem('searchValue'); return value === '' ? null : value;});
    let [username, setUsername] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [regemail, setRegemail] = useState(() => {
      const storedRegemail = localStorage.getItem('regemail');
      if (storedRegemail) {
        return storedRegemail.trim().replace(/"/g, ''); // Remove spaces and double quotes
      } else {
        return null; // Set to null if regemail is not available
      }
    });
    const [compareList, setCompareList] = useState(() => localStorage.getItem('compareList') ? JSON.parse(localStorage.getItem('compareList')) : []);
    const [favoritesList, setFavoritesList] = useState(() => localStorage.getItem('favoritesList') ? JSON.parse(localStorage.getItem('favoritesList')) :[]);
    const [cartList, setCartList] = useState(() => localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : []);
    const [severity, setSeverity] = useState('info');
    const [message, setMessage] = useState('');
    const messageToSnackbar = user ? 'Merchant details not updated' : 'Login Required';
    const severityForSnackbar = user ? 'info' : 'error';
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showSearchBar,setSearchBar]=useState(false)
    const [open, setOpen] = useState(false);
    const[alredyInCart,setAlreadyInCart]=useState({})
    const [dashboardtype,setDashboardType]=useState(null)

    const navigate =useNavigate()
    const location=useLocation()



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('regemail')
        alert("Logged out ")
        navigate('/', { replace: true });
    }
    const isProductInCart = (product) => {
      const productIndex = cartList.findIndex(
        (item) => item.product_serial === product.product_serial
      );
      return productIndex !== -1;
    };
    
    
    
    const handleAddToCart= (product) => {
        let updatedCartList = cartList ? [...cartList] : [];
        const productIndex = updatedCartList.findIndex(
          (item) => item.product_serial === product.product_serial
        );
        if (productIndex !== -1) {
          // Remove the product object from the cartList array
          updatedCartList.splice(productIndex, 1);
          setCartList(updatedCartList);
      
          // Show message
          setMessage("Product removed from cart!");
          setSeverity("warning");
          setShowSnackbar(true);
        } else {
          // Add the product to the cartList array
          updatedCartList.push(product);
          setCartList(updatedCartList);
      
          // Show success message
          setMessage("Product added to cart!");
          setSeverity("success");
          setShowSnackbar(true);
        }
      
        // Update the cartList in local storage
        localStorage.setItem("cartList", JSON.stringify(updatedCartList));
    };
    const handleClearCart = () => {
        // Clear the cartList array
        setCartList([]);      
        // Show message
        setMessage("Cart cleared!");
        setSeverity("warning");
        setShowSnackbar(true);
      
        // Update the cartList in local storage
        localStorage.removeItem("cartList");
      };
      
      
    
       
      const handleAddToCompare= (product) => {
        let updatedCompareList = compareList? [...compareList] : [];
        const productIndex = updatedCompareList.findIndex(
          (item) => item.product_serial === product.product_serial
        );
        if (productIndex !== -1) {
          // Remove the product object from the compareListarray
          updatedCompareList.splice(productIndex, 1);
          setCompareList(updatedCompareList);
      
          // Show message
          setMessage("Product removed from Comparison List!");
          setSeverity("warning");
          setShowSnackbar(true);
        } else {
          // Add the product to the compareListarray
          updatedCompareList.push(product);
          setCompareList(updatedCompareList);
      
          // Show success message
          setMessage("Product added for Comparison!");
          setSeverity("success");
          setShowSnackbar(true);
        }
      
        // Update the compareListin local storage
        localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
      };
      
      
    
    const handleAddToFavorites= (product) => {
      let updatedFavoritesList = favoritesList ? [...favoritesList] : [];
      const productIndex = updatedFavoritesList.findIndex(
        (item) => item.product_serial === product.product_serial
      );
      if (productIndex !== -1) {
        // Remove the product object from the favoritesList array
        updatedFavoritesList.splice(productIndex, 1);
        setFavoritesList(updatedFavoritesList);
    
        // Show message
        setMessage("Product removed from Wishlist!");
        setSeverity("warning");
        setShowSnackbar(true);
      } else {
        // Add the product to the favoritesList array
        updatedFavoritesList.push(product);
        setFavoritesList(updatedFavoritesList);
    
        // Show success message
        setMessage("Product added to Wishlist!");
        setSeverity("success");
        setShowSnackbar(true);
      }
    
      // Update the favoritesList in local storage
      localStorage.setItem("favoritesList", JSON.stringify(updatedFavoritesList));
    };  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowSnackbar(false);
      }; 
    
    const handleModalClose = () => {
        setOpen(false);
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
      // This effect will run when the component mounts and whenever the value of `authTokens` changes.
  
      // Check if authTokens are available
      if (authTokens) {
        // Check if `authTokens.merchant` is true
        if (authTokens.merchant === true || authTokens.merchant === 'True') {
          setDashboardType('Merchant');
        }
        // Check if `authTokens.customer` is true
        else if (authTokens.customer === true || authTokens.customer === 'True') {
          setDashboardType('Customer');
        }
        // Check if `authTokens.admin` is true
        else if (authTokens.admin === true || authTokens.admin === 'True') {
          setDashboardType('Admin');
        }
      }
    }, [authTokens]); // The effect depends on `authTokens`, so we add it as a dependency.
  
     


    let contextData = {
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        setUser:setUser,
        setAuthTokens:setAuthTokens,
        regemail:regemail,
        setRegemail:setRegemail,
        searchValue:searchValue,
        setSearchValue:setSearchValue,
        compareList :compareList,
        favoritesList: favoritesList,
        cartList:cartList,
        setCompareList:setCompareList,
        showSnackbar:showSnackbar,
        setShowSnackbar:setShowSnackbar,
        setCartList:setCartList,
        setFavoritesList:setFavoritesList,
        handleAddToCart:handleAddToCart,
        handleAddToCompare:handleAddToCompare,
        handleAddToFavorites : handleAddToFavorites,
        setMessage:setMessage,
        messageToSnackbar:messageToSnackbar,
        setSeverity :setSeverity,
        severity: severity,
        severityForSnackbar :severityForSnackbar,
        setShowSnackbar :setShowSnackbar,
        message :message,
        handleClose: handleClose,
        setSearchBar:setSearchBar,
        showSearchBar: showSearchBar,
        open:open,
        setOpen :setOpen,
        handleModalClose : handleModalClose,
        updateCategoryName :updateCategoryName,
        apiUrl:apiUrl,
        isProductInCart:isProductInCart,
        dashboardtype:dashboardtype,
        setDashboardType:setDashboardType,
        handleClearCart :handleClearCart ,
    }



    return(
        <AuthContext.Provider value={contextData} >
            { children}
        </AuthContext.Provider>
    ) 
}

const UserAuth= ()=>{
    return useContext (AuthContext)
}

export { AuthProvider, UserAuth, AuthContext };