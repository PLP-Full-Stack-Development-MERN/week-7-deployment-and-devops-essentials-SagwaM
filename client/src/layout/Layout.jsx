import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 12 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
