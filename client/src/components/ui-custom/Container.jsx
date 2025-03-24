import { Container as MuiContainer } from "@mui/material";
import { forwardRef } from "react";

const Container = forwardRef(
  ({ children, size = "lg", sx, ...props }, ref) => {
    const sizeValues = {
      sm: "md",
      md: "lg", 
      lg: "xl",
      xl: "xl",
      full: false,
    };

    return (
      <MuiContainer
        ref={ref}
        maxWidth={sizeValues[size]}
        sx={{
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
          ...sx
        }}
        {...props}
      >
        {children}
      </MuiContainer>
    );
  }
);

Container.displayName = "Container";

export default Container;