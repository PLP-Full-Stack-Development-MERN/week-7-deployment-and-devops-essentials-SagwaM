import { useState, useEffect } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  useScrollTrigger,
  Container,
  useTheme
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from "@/components/ui-custom/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <AppBar 
      position="fixed" 
      elevation={trigger ? 1 : 0}
      sx={{
        backgroundColor: trigger ? 'background.default' : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        transition: 'all 0.3s',
        py: trigger ? 0.5 : 1.5
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Logo />
            </RouterLink>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {navigation.map((item) => (
              <Button 
                key={item.name}
                component={RouterLink}
                to={item.href}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: location.pathname === item.href ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
            <Button size="sm" component={RouterLink} to="/login">
              Sign In
            </Button>
          </Box>

          {/* Mobile Navigation Toggle */}
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            sx={{ display: { md: 'none' }, color: 'text.primary' }}
            aria-label="Toggle navigation menu"
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Navigation Drawer */}
          <Drawer
            anchor="right"
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: '100%',
                maxWidth: 300,
                boxSizing: 'border-box',
                backgroundColor: 'background.paper',
              },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2, 
              borderBottom: 1, 
              borderColor: 'divider' 
            }}>
              <Logo />
              <IconButton onClick={() => setIsMenuOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List sx={{ p: 2 }}>
              {navigation.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.href}
                    selected={location.pathname === item.href}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'action.selected',
                        color: 'primary.main',
                      }
                    }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Button 
                variant="primary" 
                component={RouterLink} 
                to="/login" 
                sx={{ mt: 2, width: '100%' }}
              >
                Sign In
              </Button>
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
