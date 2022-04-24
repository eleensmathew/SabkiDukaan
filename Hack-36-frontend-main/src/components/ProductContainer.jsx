import { Container,Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductCard from "./Product";
import ProductContext from "../context/ProductContext";
const ProductContainer = () => {
    const { products } = React.useContext(ProductContext);
  return (
    <Container sx={{ width: "100%", minHeight: "100vh" }}>
      <Typography variant="h2">Top deals</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        euismod, nisl sit amet consectetur consectetur,
      </Typography>
      <Box sx={{width:"100%",display:'flex',flexWrap:'wrap',gap:4}}>
          {
                products.map(product => <ProductCard key={product._id} product={product} />)
          }
      </Box>
    </Container>
  );
};


export default ProductContainer;