import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "./images/Slides-0.png",
    "./images/Slides-1.png",
    "./images/Slides-2.png",
    "./images/Slides-3.png",
    "./images/Slides-4.png",
    "./images/Slides-5.png",
    "./images/Slides-6.png",
    "./images/Slides-7.png"
  ];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 6000); // Change image every 6 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="homepage"
      style={{ backgroundColor: "#f1f1f1", textAlign: "center" }}
    >
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Jikonnect Soko</h1>
          <p></p>
          <Link to="/products">
        <button
          style={{
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginTop: "20px", // Adjust the value as needed
          }}
        >
          Shop Now
        </button>
        </Link>

        </div>
        <div
          className="hero-image"
          style={{
            position: "relative",
            display: "inline-block",
            border: "2px solid #ccc",
            overflow: "hidden"
          }}
        >
          <img
            src={images[currentIndex]}
            alt="Hero"
            style={{
              width: "100%",
              height: "auto",
              transition: "transform 0.5s ease-in-out"
            }}
          />
          <div
            className="slideshow-nav"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <button
              onClick={goToPrevSlide}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              &lt;
            </button>
            <button
              onClick={goToNextSlide}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-list">
        <div className="product-item">
            <img src="./images/product-0.png" alt="Product" />
            <h3>Appliances</h3>
            <p>Ksh 8000</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-item">
            <img src="./images/product-2.png" alt="Product" />
            <h3>Home Appliance</h3>
            <p>Ksh 3000</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-item">
            <img src="./images/product-3.png" alt="Product" />
            <h3>Fashion Shoes</h3>
            <p>Ksh 1500</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="brands-section">
        <h2>Brands</h2>
        <img
          src="./images/brands.gif"
          alt="Brands"
          style={{ width: "100%" }}
        />
      </div>
      {/* <div className="partners-section">
        <h2>Our Partners</h2>
        
        <img
          src="./images/partner1.png"
          alt="Partner 1"
          style={{ width: "120px" }}
        />
        
      
        <img
          src="./images/partner3.png"
          alt="Partner 3"
         style={{ width: "120px", height: "100%", objectFit: "cover" }}
        />

         <img
          src="./images/partner5.jpg"
          alt="Partner 5"
          style={{ width: "120px", height: "100%", objectFit: "cover" }}
        />
        <img
          src="./images/partner6.png"
          alt="Partner 6"
          style={{ width: "120px", height: "100%", objectFit: "cover" }}
        />
        <img
          src="./images/partner7.png"
          alt="Partner 7"
          style={{ width: "120px", height: "100%", objectFit: "cover" }}
        />
        <img
          src="./images/partner8.png"
          alt="Partner 8"
          style={{ width: "120px" }}
        />
         <img
          src="./images/partner10.png"
          alt="Partner 10"
          style={{ width: "120px" }}
        />
        <img
          src="./images/partner11.jpg"
          alt="Partner 11"
          style={{ width: "120px" }}
        />
        <img
          src="./images/partner12.png"
          alt="Partner 12"
          style={{ width: "120px" }}
        />
        <img
          src="./images/partner13.png"
          alt="Partner 13"
          style={{ width: "120px" }}
        />
        
      </div> */}
    </div>
  );
};

export default Home;
