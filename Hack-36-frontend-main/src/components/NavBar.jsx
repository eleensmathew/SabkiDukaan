import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { RiLoginCircleFill, RiShoppingBag3Line } from "react-icons/ri";
import { AiFillShop, AiFillTags } from "react-icons/ai";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineGpsFixed,
} from "react-icons/md";
import { logout } from "../api/Auth";
import {GrHistory} from "react-icons/gr";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // make sets of 6 tags and make a list of them

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleLogout=async()=>{
   await logout();
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
        <CloseIcon onClick={toggleDrawer(anchor, false)} /> Menu
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <ListItem>
          <Link to="/seller/login">
            {" "}
            <Typography variant="h6">
              {" "}
              <RiLoginCircleFill /> Login as Seller
            </Typography>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/customer/login">
            <Typography variant="h6">
              <RiLoginCircleFill /> Login as Customer
            </Typography>
          </Link>
        </ListItem>
        {/* privelage */}

        <ListItem>
          <Link to="/seller/addProduct">
            <Typography variant="h6">
              <AiFillTags /> Add Products
            </Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/seller/orders">
            <Typography variant="h6">
              <RiShoppingBag3Line /> Orders
            </Typography>
          </Link>
        </ListItem>
        {/* privalage */}
        {/* user options */}
        <ListItem>
          <Link to="/customer/cart">
            <Typography variant="h6">
              <MdOutlineProductionQuantityLimits /> Cart
            </Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/customer/orderhistory">
            <Typography variant="h6">
              <GrHistory /> Order History
            </Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/customer/cart">
            <Typography variant="h6">
              <MdOutlineGpsFixed /> Track Products
            </Typography>
          </Link>
        </ListItem>
        <ListItem onClick={handleLogout}>
          <Link to="/">
            <Typography variant="h6">
              Logout
            </Typography>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Typography
            sx={{ mr: 2.5, cursor: "pointer" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Typography>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
