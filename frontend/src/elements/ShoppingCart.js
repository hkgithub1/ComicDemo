import React, { useState, useEffect } from "react";
import CartItemsTable from "./CartItemsTable.js";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Stack, Button, Divider, IconButton } from "@mui/material";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export default function ShoppingCart(props) {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const removeFromCart = (removeitem) => {
    setCartItems(cartItems.filter((item) => item !== removeitem));
    window.location.reload();
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Drawer
      open={props.isOpen}
      onClose={props.handleCartClose}
      variant="temporary"
      anchor="right"
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 600,
          boxSizing: "border-box",
        },
      }}
    >
      <Stack spacing={2} padding={2} bgcolor="background.main">
        <Box display="flex" justifyContent="end">
          <IconButton onClick={() => props.handleCartClose()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <CartItemsTable
          background="secondary.main"
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          handleCartClose={props.handleCartClose}
        />

        <Divider />

        <Button
          size="small"
          color="secondary"
          variant="contained"
          href="/checkout"
          sx={{ fontWeight: "bold" }}
        >
          Checkout
        </Button>
      </Stack>
    </Drawer>
  );
}
