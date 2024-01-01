import { createContext,useContext, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const SnackbarContext = createContext()


const SnackbarProvider = ({children}) => {     
    const [compareList, setCompareList] = useState(() => localStorage.getItem('compareList') ? JSON.parse(localStorage.getItem('compareList')) : null);
    const [favoritesList, setFavoritesList] = useState(() => localStorage.getItem('favouriteList') ? JSON.parse(localStorage.getItem('favouriteList')) : null);
    const [cartList, setCartList] = useState(() => localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : null);
    const [quantity, setQuantity] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const [severity, setSeverity] = useState('info');

    const [message, setMessage] = useState('');  
    
    const messageToSnackbar = auth.user ? 'Merchant details not updated' : 'Login Required';
    const severityForSnackbar = auth.user ? 'info' : 'error'; 


    const addToCart = (product, quantity) => {
        // Retrieve the cart from local storage
        const storedCart = localStorage.getItem("cart");
        let cart = storedCart ? JSON.parse(storedCart) : [];

        // Check if the product exists in the cart
        const productIndex = cart.findIndex(
        (item) => item.product_serial === product.product_serial
        );

        if (productIndex !== -1) {
        // Remove the product with the same serial number from the cart
        cart.splice(productIndex, 1);

        // Show message
        setMessage("Product removed from cart!");
        setSeverity("warning");
        setShowSnackbar(true);
        } else {
        // Add the product with specified quantity to the cart
        const cartProduct = {
            ...product,
            quantity,
        };
        cart.push(cartProduct);

        // Show success message
        setMessage("Product added to cart!");
        setSeverity("success");
        setShowSnackbar(true);
        }

        // Update the cart in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const handleAddToCompare = (product) => {
    if (!compareList) {
        setCompareList([product]);
        setMessage("Product added for Comparison!");
        setSeverity("success");
    } else {
        const isProductInCompares = compareList.some(
        (item) => item.product_serial === product.product_serial
        );

        if (isProductInCompares) {
        const newList = compareList.filter(
            (item) => item.product_serial !== product.product_serial
        );
        setCompareList(newList);
        setMessage("Product removed from Comparison List!");
        setSeverity("warning");
        } else {
        setCompareList([...compareList, product]);
        setMessage("Product added for Comparison!");
        setSeverity("success");
        }
    }

    setShowSnackbar(true);
    };

    useEffect(() => {
    const storedComparesList = JSON.parse(localStorage.getItem("compareList"));
    if (storedComparesList) {
        setCompareList(storedComparesList);
    }
    }, []);

    useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);



    const handleAddToFavorites = (product) => {
        if (!favoritesList) {
        setFavoritesList([product]);
        setMessage("Product added to favorites!");
        setSeverity("success");
        } else {
        const isProductInFavorites = favoritesList.some(
            (item) => item.product_serial === product.product_serial
        );
        
        if (isProductInFavorites) {
            const newList = favoritesList.filter(
            (item) => item.product_serial !== product.product_serial
            );
            setFavoritesList(newList);
            setMessage("Product removed from favorites!");
            setSeverity("warning");
        } else {
            setFavoritesList([...favoritesList, product]);
            setMessage("Product added to favorites!");
            setSeverity("success");
        }
        }

        setShowSnackbar(true);
    };

    useEffect(() => {
        const storedFavoritesList = JSON.parse(localStorage.getItem("favoritesList"));
        if (storedFavoritesList) {
        setFavoritesList(storedFavoritesList);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
    }, [favoritesList]);

    const handleAddToCart = (product) => {
        if (!cartList) {
        setCartList([product]);
        setMessage("Product added to cart!");
        setSeverity("success");
        } else {
        const isProductInCarts = cartList.some(
            (item) => item.product_serial === product.product_serial
        );
        
        if (isProductInCarts) {
            const newList = cartList.filter(
            (item) => item.product_serial !== product.product_serial
            );
            setCartList(newList);
            setMessage("Product removed from cart!");
            setSeverity("warning");
        } else {
            setCartList([...cartList, product]);
            setMessage("Product added to  cart!");
            setSeverity("success");
        }
        }

        setShowSnackbar(true);
    };

    useEffect(() => {
        const storedCartList = JSON.parse(localStorage.getItem("cartList"));
        if (storedCartList) {
        setCartList(storedCartList);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cartList));
    }, [cartList]);






    const handleShowCart = () => {
        setExpanded(false);
        setShowCart(!showCart);
        
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setShowSnackbar(false);
    }; 








    


    let contextData = {
        compareList :compareList,
        favoritesList: favoritesList,
        cartList:cartList,
        setCompareList:setCompareList,
        setCartList:setCartList,
        setFavoritesList:setFavoritesList,

    }


    return(
        <AuthContext.Provider value={contextData} >
            { children}
        </AuthContext.Provider>
    )
}

const  snackbarAuth= ()=>{
    return useContext (SnackbarContext)
}

export {SnackbarProvider, snackbarAuth, SnackbarContext};