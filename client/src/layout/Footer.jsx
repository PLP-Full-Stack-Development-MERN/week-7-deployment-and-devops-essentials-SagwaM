import { Link as RouterLink } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  Divider, 
  Stack,
  IconButton
} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Logo from "@/components/ui-custom/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerNavigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
    social: [
      {
        name: "Twitter",
        href: "#",
        icon: TwitterIcon,
      },
      {
        name: "GitHub",
        href: "#",
        icon: GitHubIcon,
      },
    ],
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'action.hover', mt: 'auto', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Logo />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 2, maxWidth: 'md' }}
            >
              A minimal, elegant platform to showcase your stories and thoughts with the world,
              designed with simplicity and user experience in mind.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              {footerNavigation.social.map((item) => (
                <IconButton
                  key={item.name}
                  component="a"
                  href={item.href}
                  aria-label={item.name}
                  color="inherit"
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <item.icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography 
              variant="subtitle2" 
              color="text.primary"
              sx={{ 
                mb: 2, 
                textTransform: 'uppercase', 
                fontWeight: 'bold', 
                letterSpacing: 1 
              }}
            >
              Navigation
            </Typography>
            <Stack spacing={1}>
              {footerNavigation.main.map((item) => (
                <Link
                  key={item.name}
                  component={RouterLink}
                  to={item.href}
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'text.primary' } }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography 
              variant="subtitle2" 
              color="text.primary"
              sx={{ 
                mb: 2, 
                textTransform: 'uppercase', 
                fontWeight: 'bold', 
                letterSpacing: 1 
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  component={RouterLink}
                  to={item.href}
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'text.primary' } }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'center' },
            gap: { xs: 2, md: 0 }
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} Storyscape. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Designed with simplicity in mind
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
