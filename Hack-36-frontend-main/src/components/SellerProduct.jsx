import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Stack } from "@mui/material";
import { AiOutlineStar } from "react-icons/ai";
import React from "react";
import CartContext from "../context/CartContext";
import { useHistory } from "react-router-dom";
function ProductCard(props) {
  const [index, setIndex] = React.useState(10);
  const [cart, setCart] = React.useContext(CartContext);
  const history = useHistory();

  const theme = useMantineTheme();
  const {
    productdescription,
    productname,
    productprice,
    productImages: images,
    _id,
    quantity,
    discount,
    weight,
    Stock,
    rating,
  } = props.product;
  console.log(cart.filter((item) => item.product === _id));
  const isAdded = cart.filter((item) => item.product === _id).length > 0;
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  const handleAddtoCart = () => {
    // add to cart
    let newCart = [...cart];
    if (newCart.filter((item) => item.product === _id).length === 0) {
      newCart.push({
        product: _id,
        quantity: 1,
      });
    } else {
      newCart.map((item) => {
        if (item.product === _id) {
          item.quantity = item.quantity + 1;
        }
      });
    }
    setCart(newCart);
  };
  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src={
              (images && images[0]?.url) ||
              /* random image */
              "https://picsum.photos/id/237/200/300"
            }
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{productname || "Product title"}</Text>
          <Badge color="pink" variant="light">
            On Sale ₹{productprice}
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {productdescription ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </Text>
        <Text size="md" style={{ fontSize: 13, lineHeight: 1.5 }}>
          {discount || 0}% off on this product.
        </Text>
        <Text
          size="md"
          style={{ fontSize: 13, color: secondaryColor, lineHeight: 1.5 }}
        >
          {weight / 1000} kg
        </Text>
        <Text
          size="md"
          weight={800}
          style={{
            color: Stock ? "#00ff44" : "red",
            fontWeight: "bold",
            lineHeight: 1.5,
          }}
        >
          {Stock ? "In Stock" : "Out of Stock"}
        </Text>
        <Stack direction={"row"}>
          {rating &&
            Array(rating)
              .fill(0)
              .map((_, index) => {
                return "⭐";
              })}
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return <AiOutlineStar />;
            })}
        </Stack>
        
        <Button
          variant="default"
          color={"violet"}
          fullWidth
          style={{ marginTop: 14, color: "black" }}
          onClick={() => history.push(`/product/${_id}`)}
        >
          View Product
        </Button>
        <Button
          variant="default"
          color={"violet"}
          fullWidth
          style={{ marginTop: 14, color: "black" }}
          onClick={() => history.push(`/product/${_id}`)}
        >
          Delete
        </Button>
      </Card>
    </div>
  );
}
export default ProductCard;
