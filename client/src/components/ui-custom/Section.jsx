import { Box } from "@mui/material";
import { forwardRef } from "react";

const Section = forwardRef(
  ({ children, sx, ...props }, ref) => {
    return (
      <Box
        component="section"
        ref={ref}
        sx={{
          py: { xs: 6, md: 8, lg: 10 },
          ...sx
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Section.displayName = "Section";

export default Section;