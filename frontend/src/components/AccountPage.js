import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext.js";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function AccountPage() {
  let { user } = useContext(AuthContext);

  return (
    <>
      <Header background="black.light" />

      <Grid
        container
        minHeight={600}
        bgcolor="background.main"
        borderTop={1}
        sx={{ py: 2 }}
      >
        <Grid item xs={6} sx={{ pl: 2 }}>
          <Typography variant="h6">Account Details</Typography>
          <Divider sx={{ bgcolor: "background.secondary", width: 175 }} />
          <Stack spacing={2}>
            <Typography>First Name: {user.first_name}</Typography>
            <Typography>Last Name: {user.last_name}</Typography>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ pl: 2 }}>
          <Typography variant="h6">Order History</Typography>
          <Divider sx={{ bgcolor: "background.secondary", width: 145 }} />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
