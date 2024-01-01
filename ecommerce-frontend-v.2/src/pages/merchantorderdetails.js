import React, { useState } from 'react';
import AddressForm from './addressform';

function MerchantOrderDetails() {
  const [addressDetails, setAddressDetails] = useState(null);

  const handleAddressSubmit = (details) => {
    setAddressDetails(details);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', display: 'inline-block' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Merchant Order Details</h2>
        <AddressForm onSubmit={handleAddressSubmit} />
      </div>

      {addressDetails && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', display: 'inline-block' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Shipping Address Details</h3>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>First Name: {addressDetails.firstName}</p>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>Last Name: {addressDetails.lastName}</p>
          {/* Display other address details similarly */}
        </div>
      )}
      {/* Display order details and other information here */}
    </div>
  );
}

export default MerchantOrderDetails;
