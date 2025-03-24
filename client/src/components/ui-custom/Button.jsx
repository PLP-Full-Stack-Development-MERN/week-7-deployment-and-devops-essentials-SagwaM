import { cn } from "@/lib/utils";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      asChild = false,
      sx,
      ...props
    },
    ref
  ) => {
    const variantMapping = {
      primary: "contained",
      secondary: "contained",
      outline: "outlined",
      ghost: "text",
      link: "text",
    };

    const sizeMapping = {
      sm: "small",
      md: "medium",
      lg: "large",
    };

    const variantStyles = {
      primary: {},
      secondary: { bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } },
      outline: {},
      ghost: {},
      link: { textDecoration: 'underline', '&:hover': { textDecoration: 'none' } },
    };

    // Handle asChild prop by rendering child with MUI Button props
    if (asChild && children) {
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        ...props,
        disabled: isLoading || disabled,
        ref,
        sx: {
          position: 'relative',
          ...sx
        },
        style: {
          ...(isLoading && { color: 'transparent' })
        }
      });
    }

    return (
      <MuiButton
        ref={ref}
        variant={variantMapping[variant]}
        size={sizeMapping[size]}
        disabled={isLoading || disabled}
        sx={{
          position: 'relative',
          borderRadius: 1,
          ...variantStyles[variant],
          ...sx
        }}
        {...props}
      >
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: '-12px',
              marginTop: '-12px'
            }}
          />
        )}
        <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          {children}
        </span>
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
