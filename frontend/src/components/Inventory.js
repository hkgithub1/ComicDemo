import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Inventory() {
  const [bookName, setName] = useState("");
  const [bookAuthor, setAuthor] = useState("");
  const [bookYear, setYear] = useState("");
  const [bookPub, setPub] = useState("");
  const [bookIssues, setIssues] = useState("");
  const [bookPrice, setPrice] = useState(0);
  const [bookFirstImg, setFirstImg] = useState("");
  const [bookSecondImg, setSecondImg] = useState("");
  const [bookThirdImg, setThirdImg] = useState("");
  const [bookFourthImg, setFourthImg] = useState("");
  const [bookFifthImg, setFifthImg] = useState("");
  const [bookSixthImg, setSixthImg] = useState("");
  const [bookSeventhImg, setSeventhImg] = useState("");
  const [bookEighthImg, setEighthImg] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const renderSearchFields = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField
            label="Title"
            placeholder="Enter title"
            value={bookName}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Author"
            placeholder="Enter author"
            value={bookAuthor}
            variant="outlined"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Year"
            placeholder="Enter year"
            value={bookYear}
            variant="outlined"
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Publisher"
            placeholder="Enter publisher"
            value={bookPub}
            variant="outlined"
            onChange={(e) => setPub(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Issues"
            placeholder="Enter issues"
            value={bookIssues}
            variant="outlined"
            onChange={(e) => setIssues(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Price"
            placeholder="Enter price"
            value={bookPrice}
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="First Image"
            placeholder="Enter image url"
            value={bookFirstImg}
            variant="outlined"
            onChange={(e) => setFirstImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Second Image"
            placeholder="Enter image url"
            value={bookSecondImg}
            variant="outlined"
            onChange={(e) => setSecondImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Third Image"
            placeholder="Enter image url"
            value={bookThirdImg}
            variant="outlined"
            onChange={(e) => setThirdImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Fourth Image"
            placeholder="Enter image url"
            value={bookFourthImg}
            variant="outlined"
            onChange={(e) => setFourthImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Fifth Image"
            placeholder="Enter image url"
            value={bookFifthImg}
            variant="outlined"
            onChange={(e) => setFifthImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Sixth Image"
            placeholder="Enter image url"
            value={bookSixthImg}
            variant="outlined"
            onChange={(e) => setSixthImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Seventh Image"
            placeholder="Enter image url"
            value={bookSeventhImg}
            variant="outlined"
            onChange={(e) => setSeventhImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Eighth Image"
            placeholder="Enter image url"
            value={bookEighthImg}
            variant="outlined"
            onChange={(e) => setEighthImg(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={searchButtonPressed}
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={addButtonPressed}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderResultsTable = () => {
    if (queryResults != "") {
      return (
        <Grid xs={12} align="center">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Search Results">
              <TableHead>
                <TableRow>
                  <TableCell>Book ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell>Issues</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>First Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {queryResults.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.book_name}</TableCell>
                    <TableCell>{row.book_author}</TableCell>
                    <TableCell>{row.book_year}</TableCell>
                    <TableCell>{row.book_publisher}</TableCell>
                    <TableCell>{row.book_issues}</TableCell>
                    <TableCell>{row.book_price}</TableCell>
                    <TableCell>{row.first_image}</TableCell>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        deleteButtonPressed(row);
                      }}
                    >
                      Delete
                    </Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      );
    }
  };

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
      .then((data) => setQueryResults(data));

    setName("");
    setAuthor("");
    setYear("");
    setPub("");
  };

  const addButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_name: bookName,
        book_author: bookAuthor,
        book_year: bookYear,
        book_publisher: bookPub,
        book_issues: bookIssues,
        book_price: bookPrice,
        first_image: bookFirstImg,
        second_image: bookSecondImg,
        third_image: bookThirdImg,
        fourth_image: bookFourthImg,
        fifth_image: bookFifthImg,
        sixth_image: bookSixthImg,
        seventh_image: bookSeventhImg,
        eighth_image: bookEighthImg,
      }),
    };
    fetch("/backend/add-book/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    setName("");
    setAuthor("");
    setYear("");
    setPub("");
    setIssues("");
    setPrice(0);
    setFirstImg("");
    setSecondImg("");
    setThirdImg("");
    setFourthImg("");
    setFifthImg("");
    setSixthImg("");
    setSeventhImg("");
    setEighthImg("");
  };

  const deleteButtonPressed = (item) => {
    const url = `/backend/delete-book/${item.id}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Box sx={{ bgcolor: "secondary.main" }}>
        {renderSearchFields()}

        {renderResultsTable()}
      </Box>
    </>
  );
}
