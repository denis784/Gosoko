import React, { createContext, useState,useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/auth';
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const{apiUrl}=useContext(AuthContext)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuantities({
      ...quantities,
      [name]: value,
    });
  };

  const addToCart = (product, quantity) => {
    // Add product to cart with specified quantity
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    handleShowCart();
  };

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddToWishlist = (product) => {
    // Add product to wishlist
  };

  const handleAddToCompare = (product) => {
    // Add product to wishlist
  };

  const handleShowCart = () => {
    setShowCart(!showCart);
    // Add product to compare list
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${apiUrl}/api/products/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setProducts(data);
            // Initialize quantity state object with default value of 1 for each product item
            const defaultQuantities = {};
            data.forEach((product) => {
              defaultQuantities[product.id] = 1;
            });
            setQuantities(defaultQuantities);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  const contextValues = {
    cart,
    setCart,
    products,
    setProducts,
    showCart,
    setShowCart,
    quantities,
    setQuantities,
    handleInputChange,
    addToCart,
    handleAddToCart,
    handleQuantityChange,
    handleAddToWishlist,
    handleAddToCompare,
    handleShowCart,
  };

  return (
    <ProductContext.Provider value={contextValues}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
