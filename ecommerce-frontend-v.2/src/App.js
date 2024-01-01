import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth/auth';
import Home from './pages/Home';
import { Navbar } from './components/header';
import NoMatch from './pages/NoMatch';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import BusinessRegistration from './pages/businesspage';
import Activate from './pages/Activate';
import Otp from './pages/otp';
import RequireAuth from './auth/requireAuth';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import PrimarySearchAppBar from './components/appbar';
import Dashboard from './pages/main-dashboard/dashboard';
import DashboardTwo from './pages/edit-dashboard/dashboardTwo';
import DashboardThree from './pages/create-dashboard/dashboardthree';
import Services from './pages/Services';
import ServiceCard from './components/servicecomponent/service-card';
import ServiceDetailPage from './pages/servicedetail';
import ProductDetailPage from './pages/productdetail';
import TrialNavbar from './components/seaarchnavbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './context/materialui-context/materialui';
import ContactBubble from './components/contact';
import CartPage from './pages/cart';
import FavouritePage from './pages/favourite';
import ProductServicePage from './pages/sampleform';
import ProductTable from './pages/produsctstable';
import BusinessPage from './pages/main-dashboard/businesspage';
import BusinessPageEdit from './pages/edit-dashboard/businessedit';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import Product_DetailPage from './pages/product-detail-merchant';
import AdminDashboard from './pages/official-dashboard/Dashboards/admin';
import MiniDrawer from './pages/official-dashboard/testdashboard';
import HeaderVerify from './components/headerContext';
import BusinessTable from './pages/main-dashboard/businessspagelist';
import DashboardCheck from './pages/official-dashboard/dashboardContext'
import OrderTable  from './pages/main-dashboard/orderstable'
import ProfileEdit from './pages/edit-dashboard/profileedit';
import ProfilePage from './pages/main-dashboard/profilecomponent';
import ChangePassword from './pages/changepassword';
import CreateBusinessPage from './pages/create-dashboard/createbusiness';
import ServiceAdminTable from './pages/servicetableadmin';
import ProductAdminTable from './pages/productstableadmin';
import CustomerTable from './pages/cutomertable';
import MerchantTable from './pages/merchanttable';
import  ProductOrderTable from './pages/productorders';
import ServiceOrderTable from './pages/main-dashboard/serviceordertable';
import ComparisonPage from './pages/compare';
import AddressForm from './pages/addressform';
import PaymentForm from './pages/paymentform';
import Review from './pages/review';
import Checkout from './pages/checkout';
import FAQs from './pages/faqs';
import AboutUs from './pages/aboutus';
import OrderStatus from './pages/orderstatus';
import ContactUs from './pages/contactus';
import MerchantOrderDetails from './pages/merchantorderdetails';
import MerchantOrderConfirmation from './pages/MerchantOrderConfirmation';
import OrderPlacementForm from './pages/OrderPlacementForm';
import OrderUpdate from './pages/OrderUpdate';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>  
         {/* This is the header  knows what to render it includes the appbar */}
          <HeaderVerify>                 
          <Routes>                  
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />
              <Route path="/products" element={<Products />}>
                <Route path=":appname/" element={<Products />} />
                <Route path=":appname/:category/" element={<Products />} />
                <Route path=":appname/:category/:subcategory/" element={<Products />} />
                <Route path=":appname/:category/:subcategory/:type" element={<Products />} />
                <Route path=":appname/:category/:subcategory/:type" element={<Products />} />
                <Route path=":appname" element={<Products />} />
              </Route>
              <Route path="/products/:appname/:category/:subcategory/:type/:product_serial" element={<ProductDetailPage />} />
              <Route path="/services" element={<Services />}>
                <Route path=":appname/" element={<Services />} />
                <Route path=":appname/:category/" element={<Services />} />
                <Route path=":appname/:category/:subcategory/" element={<Services />} />
                <Route path=":appname/:category/:subcategory/:type" element={<Services />} />
                <Route path=":appname/:category/:subcategory/:type" element={<Services />} />
                <Route path=":appname" element={<Services />} />
              </Route>
              <Route path="/services/:appname/:category/:subcategory/:type/:service_serial" element={<ServiceDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<FavouritePage />} />
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/form" element={< ProductServicePage />} />
              <Route path="/verify/account" element={<Activate />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<Otp />} /> 
                           
              <Route path="/dashboard" element={<DashboardCheck/>} />
              <Route path="/dashboard/profile/" element={<RequireAuth><ProfilePage/></RequireAuth>} />
              <Route path="/dashboard/profile/edit" element={<RequireAuth><ProfileEdit/></RequireAuth>} />
              <Route path="/dashboard/account" element={<RequireAuth><ChangePassword/></RequireAuth>} />
              <Route path="/dashboard/product_orders/" element={<RequireAuth><OrderTable/></RequireAuth>} />
              <Route path="/dashboard/service_orders/" element={<RequireAuth><ServiceOrderTable/></RequireAuth>} />
              <Route path="/dashboard/businesses/" element={<RequireAuth><BusinessTable/></RequireAuth>} />
              <Route path="/dashboard/customers/" element={<RequireAuth><CustomerTable/></RequireAuth>} />
              <Route path="/dashboard/merchants/" element={<RequireAuth><MerchantTable/></RequireAuth>} />
              <Route path="/dashboard/businesses/create" element={<RequireAuth><CreateBusinessPage/></RequireAuth>} />
              <Route path="/dashboard/products&services/" element={<RequireAuth><ProductTable/></RequireAuth>} />
              <Route path="/dashboard/products/" element={<RequireAuth><ProductAdminTable/></RequireAuth>} />
              {/* <Route path="/dashboard/productorders/" element={<RequireAuth><ProductOrderTable/></RequireAuth>} /> */}
              <Route path="/dashboard/services/" element={<RequireAuth><ServiceOrderTable/></RequireAuth>} />
              <Route path="/dashboard/products&services/create" element={<RequireAuth><ProductServicePage/></RequireAuth>} />
              <Route path="/dashboard/business/detail/:businessname" element={<RequireAuth><BusinessPage/></RequireAuth>} />
              <Route path="/dashboard/business/edit/:businessname" element={<RequireAuth><BusinessPageEdit/></RequireAuth>} />
              <Route path="/dashboard/products&services/:product_serial" element={<RequireAuth><Product_DetailPage/></RequireAuth>} />
              
              {/* <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
              <Route path="/dashboard/business/detail/:businessname" element={<RequireAuth><BusinessPage/></RequireAuth>} />
              <Route path="/dashboard/business/edit/:businessname" element={<RequireAuth><BusinessPageEdit/></RequireAuth>} />
              <Route path="/dashboard/product/detail/:product_serial" element={<RequireAuth><Product_DetailPage/></RequireAuth>} />           
              <Route path="/dashboard/create" element={<RequireAuth><DashboardThree/></RequireAuth>} />
              <Route path="/dashboard/edit" element={<RequireAuth><DashboardTwo/></RequireAuth>} /> */}
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:uidb64/:token/" element={<ResetPassword />} />
              <Route path="/services" element={<Services />} />
              <Route path="/formtable" element={<RequireAuth><ProductTable/></RequireAuth>} />
              <Route path="/businessregistration" element={<RequireAuth><BusinessRegistration/></RequireAuth>} />
              <Route path="*" element={<NoMatch />} />
              <Route path="/register/terms&conditions" element={< TermsAndConditionsPage />} />
              <Route path="/terms&conditions" element={< TermsAndConditionsPage />} />
              <Route path="/addressform" element={< AddressForm />} />
              <Route path="/paymentform" element={< PaymentForm />} />
              <Route path="/review" element={< Review />} />
              <Route path="/checkout" element={<RequireAuth>< Checkout /></RequireAuth>} />
              <Route path="/faqs" element={< FAQs />} />
              <Route path="/aboutus" element={< AboutUs />} />
              <Route path="/orderstatus" element={< OrderStatus />} />
              <Route path="/contactus" element={< ContactUs />} />
              <Route path="/merchantorderdetails" element={< MerchantOrderDetails />} />
              <Route path="/merchantorderconfirmation" element={< MerchantOrderConfirmation/>} />
              <Route path="/orderplacementform" element={< OrderPlacementForm />} />
              <Route path="/orderupdate" element={< OrderUpdate />} />
            
            
            
            
            
          </Routes>
          
          <ContactBubble/>
          <Footer />
          </HeaderVerify> 
         
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;