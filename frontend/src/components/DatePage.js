import React, { useState } from "react";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import DateImageTable from "../elements/DateImageTable";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import MD5 from "crypto-js/md5";

const PUBLIC_KEY = "981a980d4cd03f67306c25136c7946c2";
const PRIVATE_KEY = "0456cf3e28a2d77f0f71859108e2d1f4bf524fd1";

export default function DatePage() {
  //Random year generator.
  // useEffect(() => {
  //   getRandomYear();
  // }, []);

  // const getRandomYear = () => {
  //   const currentYear = new Date().getFullYear();
  //   const min = Math.ceil(1961);
  //   const max = Math.floor(currentYear);
  //   setYear(Math.floor(Math.random() * (max - min) + min));
  // };

  // useEffect(() => {
  //   if (randomYear != 0) {
  //     getMarvelData();
  //   }
  // }, [randomYear]);

  //Loading tag.
  const [loading, setLoading] = useState(false);

  //Marvel API variables and handlers.
  const [year, setYear] = useState(1961);
  const [results, setResults] = useState([]);

  const getMarvelData = () => {
    setLoading(true);
    const timeStamp = Date.now().toString();
    const hash = MD5(timeStamp + PRIVATE_KEY + PUBLIC_KEY).toString();
    const current_month = new Date().getMonth() + 1;
    const cm = current_month.toString();

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}&dateRange=${year}-${cm}-01%2C%20${year}-${cm}-31&format=comic&limit=100&noVariants=true&orderBy=onsaleDate`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data.results);
        setLoading(false);
      });

    console.log(results);
  };

  const randomButtonPressed = () => {
    setLoading(true);
    const currentYear = new Date().getFullYear();
    const min = Math.ceil(1961);
    const max = Math.floor(currentYear);
    const randomYear = Math.floor(Math.random() * (max - min) + min);
    setYear(randomYear);

    const timeStamp = Date.now().toString();
    const hash = MD5(timeStamp + PRIVATE_KEY + PUBLIC_KEY).toString();
    const current_month = new Date().getMonth() + 1;
    const cm = current_month.toString();

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}&dateRange=${randomYear}-${cm}-01%2C%20${randomYear}-${cm}-31&format=comic&limit=100&noVariants=true&orderBy=onsaleDate`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data.results);
        setLoading(false);
      });

    console.log(results);
    window.scrollTo(0, 0);
  };

  //For month display.
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <Header background="black.light" />

      <Grid container bgcolor="background.main" borderTop={1}>
        <Grid
          item
          xs={12}
          borderBottom={1}
          sx={{ bgcolor: "secondary.main", p: 1 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h4" fontFamily="Neuton" fontWeight="light">
              This month in Marvel Comic History:{" "}
              {months[new Date().getMonth()]}
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              color="black"
              sx={{ width: 125 }}
              inputProps={{
                style: {
                  fontSize: 34,
                  fontFamily: "Neuton",
                  textAlign: "center",
                  padding: 0,
                },
              }}
              value={year}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setYear(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") getMarvelData();
              }}
            />
            <Button
              variant="contained"
              color="black"
              onClick={getMarvelData}
              sx={{ fontWeight: "bold", color: "text.white" }}
            >
              Go
            </Button>
            <Button
              color="black"
              variant="text"
              onClick={randomButtonPressed}
              startIcon={<CasinoOutlinedIcon style={{ fontSize: 36 }} />}
              sx={{ fontSize: 28, fontFamily: "Neuton" }}
            >
              Roll
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ bgcolor: "background.main", minHeight: 550 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ px: 2, py: 1, height: "100%" }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <DateImageTable results={results} />
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ py: 1 }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={randomButtonPressed}
            sx={{ fontWeight: "bold" }}
          >
            Try Again
          </Button>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
