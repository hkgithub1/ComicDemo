import React, { useState, useEffect } from "react";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import DateModal from "../elements/DateModal";
import {
  Grid,
  Box,
  Typography,
  Button,
  ImageList,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import MD5 from "crypto-js/md5";

const PUBLIC_KEY = "981a980d4cd03f67306c25136c7946c2";
const PRIVATE_KEY = "0456cf3e28a2d77f0f71859108e2d1f4bf524fd1";

export default function DatePage() {
  //Random year generator.
  const [randomYear, setRandomYear] = useState(0);

  useEffect(() => {
    getRandomYear();
  }, []);

  const getRandomYear = () => {
    const currentYear = new Date().getFullYear();
    const min = Math.ceil(1961);
    const max = Math.floor(currentYear);
    setRandomYear(Math.floor(Math.random() * (max - min) + min));
  };

  //Marvel API variables and handlers.
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (randomYear != 0) {
      getMarvelData();
    }
  }, [randomYear]);

  const getMarvelData = () => {
    const timeStamp = Date.now().toString();
    const hash = MD5(timeStamp + PRIVATE_KEY + PUBLIC_KEY).toString();
    const current_month = new Date().getMonth() + 1;
    const cm = current_month.toString();

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}&dateRange=${randomYear}-${cm}-01%2C%20${randomYear}-${cm}-31&format=comic&limit=100&noVariants=true&orderBy=onsaleDate`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data.results);
      });

    console.log(results);
  };

  //Modal variables and handlers.
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

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
        <Grid item xs={12} borderBottom={1} sx={{ bgcolor: "secondary.main" }}>
          <Typography variant="h5" align="center">
            Comics released in {months[new Date().getMonth()]}, {randomYear}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ px: 2, py: 1 }}>
            <ImageList cols={4} rowHeight={500} gap={20}>
              {results.map((item) => (
                <Card key={item.id} sx={{ maxWidth: 345, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image={item.thumbnail.path + "/portrait_fantastic" + ".jpg"}
                    alt="item.title"
                    onClick={() => {
                      setModalData(item);
                      setModalOpen(!modalOpen);
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title.replace(/\([^()]*\)/g, "")}
                    </Typography>

                    {item.dates?.[0]?.date != 0 ? (
                      <Typography variant="body2" color="text.darkgray">
                        Release Date:{" "}
                        {new Date(item.dates?.[0]?.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.darkgray">
                        Release Date: Not Found
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        setModalData(item);
                        setModalOpen(!modalOpen);
                      }}
                    >
                      Book Info
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </ImageList>
            <DateModal
              modalData={modalData}
              isOpen={modalOpen}
              handleClose={() => setModalOpen(!modalOpen)}
            />
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
            onClick={() => window.location.reload()}
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
