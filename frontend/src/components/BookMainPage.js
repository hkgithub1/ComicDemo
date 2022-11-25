import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import ImageTable from "../elements/ImageTable.js";
import MainCarousel from "../elements/MainCarousel.js";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Modal,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.secondary",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export default function BookMainPage() {
  //Setting data to passed book data.
  const location = useLocation();
  const data = location.state;

  //Screen center if active book changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  //Modal flag and handler.
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  };

  //Cart variables and handlers.
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newitem) => {
    setCartItems([...cartItems, { ...newitem }]);
    window.location.reload();
  };

  //Similar results variables and handlers.
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchComicData();
  }, [data]);

  const fetchComicData = () => {
    const params = new URLSearchParams({
      bp: data.book_publisher,
    });

    const query = params.toString();
    const url = `/backend/search-books/?${query}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setResults(data));
  };

  return (
    <>
      <Header background="black.light" />
      <Grid container borderTop={1} sx={{ bgcolor: "background.secondary" }}>
        <Grid
          item
          xs={8}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <MainCarousel
              {...data}
              handleModalClick={handleModalClick}
              ht={300}
              wd={400}
            />
          </Box>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(!modalOpen)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack flexDirection="row" justifyContent="end">
                <IconButton onClick={handleModalClick}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
              <MainCarousel {...data} ht={475} wd={650} />
            </Box>
          </Modal>
          <Typography variant="subtitle2">Click image to enlarge</Typography>
        </Grid>
        <Grid item xs={4} sx={{ bgcolor: "background.main", height: 500 }}>
          <Stack spacing={1} padding={1}>
            <Typography variant="h5" fontWeight="bold">
              {data.book_name + " " + data.book_issues}{" "}
            </Typography>
            <Typography variant="h6">{data.book_author} </Typography>
            <Typography variant="h6">
              {data.book_year + " " + data.book_publisher}{" "}
            </Typography>
            <Typography variant="h6">{"$" + data.book_price} </Typography>
            <Typography variant="subtitle2" fontStyle="oblique">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              convallis, orci eu gravida finibus, sem leo euismod quam, mollis
              scelerisque enim neque eu leo. Donec at molestie magna. Ut sed
              tellus sit amet erat commodo gravida eget eu lacus.
            </Typography>
            <Divider />
          </Stack>
          <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                addToCart(data);
              }}
              sx={{ fontSize: 14, fontWeight: "bold", width: 125 }}
            >
              Add to Cart
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              href="/checkout"
              sx={{ fontSize: 14, fontWeight: "bold", width: 125 }}
            >
              Checkout
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ bgcolor: "secondary.main", borderTop: 1 }}>
          <Typography variant="h6" sx={{ pl: 1, fontWeight: "bold" }}>
            Similar results
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ bgcolor: "background.main", borderTop: 1 }}>
          <ImageTable
            results={results}
            columns={5}
            rheight={250}
            gapsize={10}
          />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
