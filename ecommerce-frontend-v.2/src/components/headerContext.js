import { useLocation } from 'react-router-dom';
import { Navbar } from './header';
import PrimarySearchAppBar from './appbar';
import TrialNavbar from './seaarchnavbar';
import Breadcrumb from './breadcrumb';
import MiniDrawer from '../pages/official-dashboard/testdashboard';

const HeaderVerify = ({ children }) => {
  const location = useLocation();

  const shouldRenderNavbar = location.pathname.includes('dashboard');
  const shouldRenderBreadcrumb =
    !['/', '/register', '/verify', '/forgotpassword', '/login', '/resetpassword'].includes(location.pathname);

  const shouldRenderPrimarySearchAppBar =
    location.pathname !== '/register' &&
    !['/verify', '/forgotpassword', '/login', '/resetpassword'].includes(location.pathname);

  const shouldRenderTrialnavbar =
    location.pathname !== '/' &&
    !['/register', '/verify', '/forgotpassword', '/login', '/resetpassword'].includes(location.pathname);

  return (
    <>
      {!shouldRenderNavbar ? (
        <>
          <Navbar />
          {shouldRenderPrimarySearchAppBar && <PrimarySearchAppBar />}
          {shouldRenderTrialnavbar && <TrialNavbar />}

          {/* Conditionally render the Breadcrumb based on location */}
          {shouldRenderBreadcrumb && <Breadcrumb />}

          {/* Render other components or logic here based on your requirements */}
          {children}
        </>
      ) : (
        <MiniDrawer>{children}</MiniDrawer>
      )}
    </>
  );
};

export default HeaderVerify;
