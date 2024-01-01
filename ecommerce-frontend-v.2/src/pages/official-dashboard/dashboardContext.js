import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboard from './Dashboards/admin';
import MerchantDashboard from './Dashboards/merchant';
import CustomerDashboard from './Dashboards/customer';
import { AuthContext } from '../../auth/auth';

function DashboardCheck() {
  const { authTokens, dashboardtype, setDashboardType } = useContext(AuthContext);
  const location = useLocation();

  // Add a useEffect hook to listen for changes to the dashboardtype
  useEffect(() => {
    // This effect will run whenever the value of `dashboardtype` changes.
    // You can add additional logic here if needed.
    console.log('dashboardtype has changed:', dashboardtype);
  }, [dashboardtype]);

  // Check if authTokens is null or undefined
  if (!authTokens) {
    if (dashboardtype === 'Merchant' && location.pathname === '/dashboard') {
      // If the location is "/dashboard", show the CustomerDashboard
      return <CustomerDashboard />;
    } else {
      // If the location is not "/dashboard", render nothing
      return null;
    }
  }

  // Check if the dashboardtype is "merchant" and the location is exactly "/dashboard"
  if (dashboardtype === 'Merchant' && location.pathname === '/dashboard') {
    return <MerchantDashboard />;
  }

  // Check if the dashboardtype is "admin" and the location is exactly "/dashboard"
  if (dashboardtype === 'Admin' && location.pathname === '/dashboard') {
    return <AdminDashboard />;
  }

  // If neither merchant nor admin or the location is not "/dashboard", then render the CustomerDashboard
  return <CustomerDashboard />;
}

export default DashboardCheck;
