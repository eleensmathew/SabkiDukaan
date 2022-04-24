import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Grid, Typography } from "@mui/material";
import { AddtoCart } from "../api/Cart";
import CartContext from "../context/CartContext";
const CartItem = (props) => {
    const [cart, setCart] = React.useContext(CartContext);
    const handleAddtoCart = async (args) => {
        const {_id} = props.product.product;
      // add to cart
      let newCart = [...cart];
      let newObj={};
      if (newCart.filter((item) => item.product === _id).length === 0) {
        newCart.push({
          product: _id,
          quantity: 1,
        });
      } else {
        newCart.map((item) => {
          if (item.product === _id) {
            item.quantity = item.quantity + args;
            newObj=item;
          }
        });
      }
      setCart(newCart);
      await AddtoCart({
        product: newObj.product,
        quantity: newObj.quantity,
      });
    };
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12} sm={2}>
        <img
          src={
            props.product?.product?.productImages &&
            props.product?.product?.productImages[0]?.url
          }
          alt="product"
          width="100px"
          height="100px"
          onError={(e) => {
            e.target.src = "https://picsum.photos/200/300";
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8} alignItems="center">
        <Typography variant="h6" sx={{ mt: 3 }}>
          {props.product?.product?.productname}
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body1">
          {props.product?.product?.productdescription}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        sx={{ display: "grid", placeContent: "center" }}
      >
        <Typography sx={{ mt: 2 }} variant="body1">
          ₹{props.product?.product?.productprice} X{" "}
          <AiFillPlusCircle size={24} onClick={()=>handleAddtoCart(1)}/> {Number(props.product?.quantity)}{" "}
          <AiFillMinusCircle size={24} onClick={()=>handleAddtoCart(-1)}/>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;
