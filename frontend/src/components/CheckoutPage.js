import React, { useState, useEffect } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import CartItemsTable from "../elements/CartItemsTable.js";
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
} from "@mui/material";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export default function CheckoutPage() {
  //Billing Info variables and handlers.
  /*
  const [name, setName] = useState("");
  const [address, setAdd] = useState("");
  const [email, setEmail] = useState("");
  const [ccinfo, setCCinfo] = useState("");
  */

  //Cart variables and handlers.
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (removeitem) => {
    setCartItems(cartItems.filter((item) => item !== removeitem));
  };

  //Total Price calculations.
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += parseFloat(item.book_price);
  });

  const toFixed = (n, fixed) =>
    `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
  console.log(toFixed(totalPrice, 2));

  return (
    <>
      <Header background="black.light" />

      <Grid container bgcolor="background.main" borderTop={1}>
        <Grid item xs={6} sx={{ px: 11, py: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Billing Information</Typography>
            <Divider sx={{ bgcolor: "background.secondary" }} />
            <Stack spacing={4}>
              <Stack flexDirection="row" justifyContent="space-between">
                <TextField
                  required
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="First Name"
                  /*value={}*/
                  /*onChange={(e) => setName(e.target.value)}*/
                />
                <TextField
                  required
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label=" Last Name"
                  /*value={}*/
                  /*onChange={(e) => setName(e.target.value)}*/
                />
              </Stack>
              <TextField
                required
                size="small"
                color="secondary"
                variant="outlined"
                label="Street Address"
                /*value={}*/
                /*onChange={(e) => setName(e.target.value)}*/
              />
              <TextField
                required
                size="small"
                color="secondary"
                variant="outlined"
                label="City / Town"
                /*value={}*/
                /*onChange={(e) => setName(e.target.value)}*/
              />
              <TextField
                required
                select
                size="small"
                color="secondary"
                variant="outlined"
                label="Select State"
                /*value={}*/
                /*onChange={(e) => setName(e.target.value)}*/
              >
                <MenuItem value="NY">New York</MenuItem>
              </TextField>
              <TextField
                required
                size="small"
                color="secondary"
                variant="outlined"
                label="Zip Code"
                /*value={}*/
                /*onChange={(e) => setName(e.target.value)}*/
              />
              <TextField
                required
                size="small"
                color="secondary"
                variant="outlined"
                label="Email"
                /*value={}*/
                /*onChange={(e) => setName(e.target.value)}*/
              />
              <TextField
                required
                size="small"
                color="secondary"
                variant="outlined"
                label="Credit Card Number"
                /*value={}*/
                /*onChange={(e) => setName(e.target.value)}*/
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ px: 7, py: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Order Summary</Typography>
            <Divider sx={{ bgcolor: "background.secondary" }} />
            <CartItemsTable
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <Divider sx={{ bgcolor: "background.secondary" }} />
            <Typography variant="h6">
              Total Price: $ {toFixed(totalPrice, 2)}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontWeight: "bold" }}
            >
              Place Order
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
