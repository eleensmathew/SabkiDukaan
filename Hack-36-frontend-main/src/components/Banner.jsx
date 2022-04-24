import { Typography } from "@mui/material";
import React from "react";
import { Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/SabkiDukaan-logos_black.png";

const URL =
  "https://todoist.com/_next/static/images/header@2x_b52d8f7c7bf19d6c702569d1072ed6a2.webp";
const Banner = () => {
 return (
   <Container
     sx={{
       width: "100%",
       display: "flex",
       alignItems: "center",
       flexDirection: "column",
       minHeight: "120vh",
       mb: 5,
       backgroundImage: `url(${URL})`,
       backgroundSize: "contain",
       backgroundPosition: "bottom",
       backgroundRepeat: "no-repeat",
     }}
   >
     <img src={Logo} alt="logo" width={200} />

     <Typography variant="h1">
       <span className="text-primary">Sabki</span>Dukaan
     </Typography>
     <Stack
       direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
       spacing={2}
       sx={{ mt: 8 }}
     >
       <Link to="/customer/login">
         <Button
           variant="filled"
           sx={{
             width: "20em",
             height: "3em",
             bgcolor: "#E14531",
             color: "white",
             "&:hover": {
               bgcolor: "white",
               color: "black",
               border: "1px solid black",
             },
           }}
         >
           Login as Customer
         </Button>
       </Link>
       <Link to="/seller/login">
         <Button
           variant="filled"
           sx={{
             width: "20em",
             bgcolor: "#404EED",
             color: "white",
             display: "flex",

             height: "3em",
             "&:hover": {
               bgcolor: "black",
               color: "white",
               border: "1px solid black",
             },
           }}
         >
           Login as Seller
         </Button>
       </Link>
     </Stack>
   </Container>
 );
};
export default Banner;