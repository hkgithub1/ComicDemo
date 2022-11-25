import React, { useState, useEffect } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import marvelvsdc1 from "../images/marvelvsdc1.jpg";
import marvelvsdc2 from "../images/marvelvsdc2.jpg";
import marvelvsdc3 from "../images/marvelvsdc3.jpg";
import marvelvsdc4 from "../images/marvelvsdc4.jpg";
import marvelvsdc5 from "../images/marvelvsdc5.jpg";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";

export default function HomePage() {
  //Random number generator to decide image display.
  const [imageNumber, setImageNumber] = useState(0);
  const imageArray = [
    marvelvsdc1,
    marvelvsdc2,
    marvelvsdc3,
    marvelvsdc4,
    marvelvsdc5,
  ];
  /*
  useEffect(() => {
    getImageNumber();
  }, []);
  const getImageNumber = () => {
    const min = Math.ceil(0);
    const max = Math.floor(4);
    setImageNumber(Math.floor(Math.random() * (max - min) + min));
  };
  */

  //Marvel and DC button handlers.
  const handleMarvelButton = () => {
    const marvelQuery = new URLSearchParams();
    marvelQuery.append("query", "Marvel");
    window.location.replace("/search?" + marvelQuery.toString());
  };
  const handleDCButton = () => {
    const dcQuery = new URLSearchParams();
    dcQuery.append("query", "DC");
    window.location.replace("/search?" + dcQuery.toString());
  };

  return (
    <>
      <Box
        height={760}
        sx={{
          backgroundImage: `url(${imageArray[imageNumber]})`,
          backgroundSize: "cover",
        }}
      >
        <Header background="background.transparent" />

        <Grid
          container
          spacing={1}
          display="flex"
          flexDirection="column"
          height={600}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography fontWeight="bold" sx={{ color: "text.white" }}>
              Browse Listings
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleMarvelButton}
                sx={{ px: 1, fontWeight: "bold", borderRadius: 3 }}
              >
                Marvel
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleDCButton}
                sx={{ px: 1, fontWeight: "bold", borderRadius: 3 }}
              >
                DC
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
