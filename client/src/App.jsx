import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#f3f4f6',
      light: '#f9fafb',
      dark: '#e5e7eb',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111827',
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
