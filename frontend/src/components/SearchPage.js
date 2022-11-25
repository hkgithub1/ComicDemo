import React, { useState, useEffect } from "react";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import ImageTable from "../elements/ImageTable.js";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import {
  Grid,
  Stack,
  Box,
  TextField,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  MenuItem,
} from "@mui/material";

export default function SearchPage() {
  //Search sidebar variables and handlers.
  const [bookName, setName] = useState("");
  const [bookAuthor, setAuthor] = useState("");
  const [bookYear, setYear] = useState("");
  const [bookPub, setPub] = useState("");
  const [results, setResults] = useState([]);
  const [resultsForFiltering, setResultsForFiltering] = useState([]);

  const searchButtonPressed = () => {
    const params = new URLSearchParams({
      bn: bookName,
      ba: bookAuthor,
      by: bookYear,
      bp: bookPub,
    });
    const query = params.toString();
    const url = `/backend/search-books/?${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setResultsForFiltering(data);
      });
  };

  //Homepage Marvel/DC button and Header Searchbar handler.
  const passedParams = new URLSearchParams(window.location.search);
  const searchQuery = passedParams.get("query");

  useEffect(() => {
    const params = new URLSearchParams({
      bn: searchQuery,
      ba: searchQuery,
      by: searchQuery,
      bp: searchQuery,
    });
    const query = params.toString();
    const url = `/backend/search-books/?${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setResultsForFiltering(data);
      });
  }, []);

  //Price Filter (Price and Range-based) variables and handlers.
  const [priceFilter, setPriceFilter] = useState(10000);
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(10000);

  useEffect(() => {
    filterByPrice();
  }, [priceFilter, resultsForFiltering]);

  useEffect(() => {
    filterByPriceRange();
  }, [lowPriceRange, highPriceRange, resultsForFiltering]);

  const filterByPrice = () => {
    const filteredResults = resultsForFiltering.filter(
      (item) => parseFloat(item.book_price) < priceFilter
    );
    setResults(filteredResults);
    setSortType("");
  };
  const filterByPriceRange = () => {
    const filteredResults = resultsForFiltering.filter(
      (item) =>
        parseFloat(item.book_price) > lowPriceRange &&
        parseFloat(item.book_price) < highPriceRange
    );
    setResults(filteredResults);
    setSortType("");
  };
  const handlePriceFilterChange = (event) => {
    const filter = event.target.value;
    if (filter != priceFilter) {
      setPriceFilter(filter);
    } else {
      setPriceFilter(10000);
    }
  };

  //Sort Menu variables and handlers.
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    sortResults();
  }, [sortType]);

  const sortResults = () => {
    const tempResults = [...results];
    if (sortType == "priceasc") {
      tempResults.sort(
        (a, b) => parseFloat(a.book_price) - parseFloat(b.book_price)
      );
      setResults(tempResults);
    } else if (sortType == "pricedes") {
      tempResults.sort(
        (a, b) => parseFloat(b.book_price) - parseFloat(a.book_price)
      );
      setResults(tempResults);
    } else if (sortType == "alpha") {
      tempResults.sort((a, b) =>
        a.book_name > b.book_name ? 1 : b.book_name > a.book_name ? -1 : 0
      );
      setResults(tempResults);
    } else if (sortType == "revalpha") {
      tempResults.sort((a, b) =>
        b.book_name > a.book_name ? 1 : a.book_name > b.book_name ? -1 : 0
      );
      setResults(tempResults);
    } else if (sortType == "") {
      tempResults.sort((a, b) => a.id - b.id);
      setResults(tempResults);
    }
  };

  return (
    <>
      <Header background="black.light" />

      <Grid
        container
        height={650}
        borderTop={1}
        sx={{ bgcolor: "background.main" }}
      >
        <Grid
          item
          xs={2}
          display="flex"
          flexDirection="column"
          borderRight={1}
          padding={1}
        >
          <Stack spacing={2}>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              label="Title"
              placeholder="Enter title"
              value={bookName}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") searchButtonPressed();
              }}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              label="Author"
              placeholder="Enter author"
              value={bookAuthor}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setAuthor(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") searchButtonPressed();
              }}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              label="Year"
              placeholder="Enter year"
              value={bookYear}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setYear(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") searchButtonPressed();
              }}
            />
            <TextField
              label="Select publisher"
              select
              size="small"
              color="secondary"
              value={bookPub}
              onChange={(e) => setPub(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Marvel">Marvel</MenuItem>
              <MenuItem value="DC">DC</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="secondary"
              onClick={searchButtonPressed}
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              Search
            </Button>
            <FormControl color="secondary">
              <FormLabel>Filter By Price</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      value={100}
                      checked={priceFilter == 100}
                      onChange={handlePriceFilterChange}
                    />
                  }
                  label="< $100"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      value={200}
                      checked={priceFilter == 200}
                      onChange={handlePriceFilterChange}
                    />
                  }
                  label="< $200"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      value={300}
                      checked={priceFilter == 300}
                      onChange={handlePriceFilterChange}
                    />
                  }
                  label="< $300"
                />
              </FormGroup>
            </FormControl>
            <Stack spacing={1} direction="row" alignItems="center">
              <TextField
                size="small"
                color="secondary"
                variant="outlined"
                label="Low"
                value={lowPriceRange}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setLowPriceRange(e.target.value)}
              />

              <TextField
                size="small"
                color="secondary"
                variant="outlined"
                label="High"
                value={highPriceRange}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setHighPriceRange(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setLowPriceRange(0);
                  setHighPriceRange(10000);
                }}
              >
                <RestartAltOutlinedIcon fontSize="small" color="secondary" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={10}>
          <Box
            display="flex"
            justifyContent="end"
            borderBottom={1}
            sx={{ width: "100%", py: 0.5 }}
          >
            <TextField
              sx={{ width: 150 }}
              label="Sort"
              select
              size="small"
              color="secondary"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="alpha">A-Z</MenuItem>
              <MenuItem value="revalpha">Z-A</MenuItem>
              <MenuItem value="priceasc">Price Ascending</MenuItem>
              <MenuItem value="pricedes">Price Descending</MenuItem>
            </TextField>
          </Box>
          <ImageTable
            results={results}
            columns={3}
            rheight={250}
            gapsize={40}
          />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
