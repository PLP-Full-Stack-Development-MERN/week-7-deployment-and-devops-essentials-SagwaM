import { Typography } from '@mui/material';

const Logo = ({ size = "md" }) => {
  const sizeStyles = {
    sm: { fontSize: '1.125rem' },
    md: { fontSize: '1.25rem' },
    lg: { fontSize: '1.5rem' },
  };

  return (
    <Typography 
      variant="h1" 
      component="div" 
      sx={{ 
        fontWeight: 'bold', 
        letterSpacing: '-0.05em',
        ...sizeStyles[size],
        background: 'linear-gradient(90deg, primary.main, primary.light)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
      }}
    >
      Storyscape
    </Typography>
  );
};

export default Logo;