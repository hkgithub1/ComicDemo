import React from "react";
import { Link } from "react-router-dom";
import facebook from "../images/icons8-facebook-24.png";
import instagram from "../images/icons8-instagram-24.png";
import twitter from "../images/icons8-twitter-24.png";
import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function Footer() {
  return (
    <Grid
      container
      position="relative"
      bgcolor="secondary.main"
      padding={1}
      borderTop={1}
    >
      <Grid item xs={4} display="flex" flexDirection="column">
        <Stack spacing={0.75} sx={{ width: "40%" }}>
          <Typography fontSize={18} fontFamily="Neuton" fontWeight="bold">
            Customer Care
          </Typography>
          <Divider sx={{ bgcolor: "background.secondary" }} />
          <Typography fontSize={14} fontFamily="Neuton">
            FAQs
          </Typography>
          <Typography fontSize={14} fontFamily="Neuton">
            Cancelling or Changing an Order
          </Typography>
          <Typography fontSize={14} fontFamily="Neuton">
            Returns & Exchanges
          </Typography>
          <Typography fontSize={14} fontFamily="Neuton">
            Shipping & Handling
          </Typography>
          <Typography fontSize={14} fontFamily="Neuton">
            Terms of Service
          </Typography>
          <Typography fontSize={14} fontFamily="Neuton">
            Privacy Policy
          </Typography>
        </Stack>
      </Grid>

      <Grid
        item
        xs={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography fontSize={24} fontFamily="Neuton" fontWeight="bold">
          Sign up & get 10% off your next order
        </Typography>
        <TextField size="small" label="Enter Email" sx={{ my: 1 }} />
        <Button variant="contained" color="black" sx={{ color: "text.white" }}>
          Subscribe
        </Button>
      </Grid>

      <Grid item xs={4} display="flex" flexDirection="column" alignItems="end">
        <Stack spacing={0.75} alignItems="end">
          <Typography fontSize={20} fontFamily="Neuton" fontWeight="bold">
            Lost and Found Comics
          </Typography>
          <Typography fontSize={18} fontFamily="Neuton">
            123-45 Main Street
          </Typography>
          <Typography fontSize={18} fontFamily="Neuton">
            New York, NY
          </Typography>
          <Typography fontSize={18} fontFamily="Neuton">
            (718) 555-5555
          </Typography>
        </Stack>
        <Box sx={{ py: 1 }}>
          <Link to={"/"}>
            <img src={facebook} alt="facebook" />
          </Link>
          <Link to={"/"}>
            <img src={instagram} alt="instagram" />
          </Link>
          <Link to={"/"}>
            <img src={twitter} alt="twitter" />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
