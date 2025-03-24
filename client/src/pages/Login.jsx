import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Fade,
  Slide,
} from "@mui/material";
import { toast } from "sonner";

const Login = () => {
  const [loginMode, setLoginMode] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (loginMode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        setIsSubmitting(false);
        return;
      }

      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        setIsSubmitting(false);
        return;
      }
    }

    setTimeout(() => {
      toast.success(
        loginMode === "signin"
          ? "Successfully signed in!"
          : "Account created successfully!"
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleMode = () => {
    setShowForm(false);
    setTimeout(() => {
      setLoginMode(loginMode === "signin" ? "signup" : "signin");
      setFormData({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      });
      setShowForm(true);
    }, 300);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={true} timeout={700}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Fade in={showForm} timeout={400}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {loginMode === "signin" ? "Welcome Back" : "Create Account"}
            </Typography>
          </Fade>
          <Fade in={showForm} timeout={600}>
            <Typography variant="body2" color="textSecondary" mb={3}>
              {loginMode === "signin"
                ? "Sign in to access your account."
                : "Join our community today!"}
            </Typography>
          </Fade>

          <Slide direction="up" in={showForm} timeout={500}>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                {loginMode === "signup" && (
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                )}

                <TextField
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                {loginMode === "signup" && (
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : loginMode === "signin" ? "Sign In" : "Create Account"}
                </Button>
              </Box>
            </form>
          </Slide>

          <Typography variant="body2" sx={{ mt: 3 }}>
            {loginMode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"} {" "}
            <Button color="secondary" onClick={toggleMode}>
              {loginMode === "signin" ? "Sign Up" : "Sign In"}
            </Button>
          </Typography>

          <Box mt={6}>
            <Typography variant="body2" align="center">
              Or continue with
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              </svg>
              Google
            </Button>
          </Box>

          <Typography mt={8} variant="body2" align="center">
            By continuing, you agree to our {" "}
            <Link to="/terms">Terms of Service</Link> and {" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </Typography>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login;
