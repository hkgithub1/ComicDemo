import React, { useState } from "react";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import MD5 from "crypto-js/md5";

const PUBLIC_KEY = "981a980d4cd03f67306c25136c7946c2";
const PRIVATE_KEY = "0456cf3e28a2d77f0f71859108e2d1f4bf524fd1";

export default function GuessPage() {
  //Variables and tags.

  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState();
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(10);

  //Marvel API variables and handlers.
  const [results, setResults] = useState([]);

  const getMarvelData = () => {
    setLoading(true);
    const min = Math.ceil(2);
    const max = Math.floor(100143);
    const comicId = Math.floor(Math.random() * (max - min) + min);
    const timeStamp = Date.now().toString();
    const hash = MD5(timeStamp + PRIVATE_KEY + PUBLIC_KEY).toString();

    const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${timeStamp}&apikey=${PUBLIC_KEY}&hash=${hash}&format=comic`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 404) {
          console.log("not found");
          getMarvelData();
        } else if (data.data.results?.[0]?.images?.[0]?.path) {
          setResults(data.data.results);
        } else {
          console.log("no image");
          getMarvelData();
        }
      });

    setLoading(false);
    setAnswer("");
    setCorrect("");
    setRevealAnswer(false);
  };
  console.log(results);

  //Answer variables and handlers.
  const [answer, setAnswer] = useState();

  const answerButtonPressed = () => {
    const solution = new Date(results?.[0]?.dates?.[0]?.date).getFullYear();
    if (
      answer >= solution - difficultyLevel &&
      answer <= +solution + +difficultyLevel
    ) {
      setCorrect(true);
    } else {
      alert("Incorrect. Try Again");
      setAnswer("");
    }
  };

  //Rendering functions for ImageArea, DifficultyGroup, and PlayArea.

  const renderImageArea = () => {
    if (results != 0 && loading == false) {
      return (
        <img
          src={`${results?.[0]?.images?.[0]?.path}/portrait_uncanny.jpg`}
          alt={results?.[0]?.title}
          height="98%"
        />
      );
    } else if (loading == true) {
      return <CircularProgress color="secondary" />;
    }
  };

  const renderDifficultyGroup = () => {
    return (
      <FormControl>
        <FormLabel color="secondary">Choose Difficulty Level</FormLabel>
        <RadioGroup
          row
          color="secondary"
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
        >
          <FormControlLabel
            value={10}
            control={<Radio color="secondary" />}
            label="within 10"
          />
          <FormControlLabel
            value={5}
            control={<Radio color="secondary" />}
            label="within 5"
          />
          <FormControlLabel
            value={3}
            control={<Radio color="secondary" />}
            label="within 3"
          />
          <FormControlLabel
            value={0}
            control={<Radio color="secondary" />}
            label="exact"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  const renderPlayArea = () => {
    if (correct == "" && revealAnswer == false) {
      return (
        <Stack spacing={2} display="flex" alignItems="center">
          <Typography variant="h4">What year was this released?</Typography>
          <TextField
            color="secondary"
            variant="outlined"
            value={answer}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") answerButtonPressed();
            }}
            inputProps={{
              style: {
                fontSize: 34,
                textAlign: "center",
              },
            }}
          />
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={answerButtonPressed}
          >
            Submit
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={() => setRevealAnswer(true)}
          >
            Show Answer
          </Button>
        </Stack>
      );
    } else if (correct == true || revealAnswer == true) {
      return (
        <Stack spacing={2} display="flex" alignItems="center">
          {correct == true && <Typography variant="h3">Correct!</Typography>}
          <Typography variant="h4" sx={{ wordWrap: "break-word" }}>
            {results?.[0]?.title.replace(/\([^()]*\)/g, "")}
          </Typography>
          <Typography variant="h5"> was released in</Typography>
          <Typography variant="h4">
            {new Date(results?.[0]?.dates?.[0]?.date).getFullYear()}
          </Typography>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={getMarvelData}
          >
            Try Again
          </Button>
        </Stack>
      );
    }
  };

  return (
    <>
      <Header background="black.light" />
      <Grid
        container
        height={625}
        borderTop={1}
        sx={{ bgcolor: "background.secondary" }}
      >
        {results != 0 ? (
          <>
            <Grid item xs={5}>
              <Box sx={{ height: "10%", p: 1 }}>{renderDifficultyGroup()}</Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: "80%", p: 1 }}
              >
                {renderPlayArea()}
              </Box>
            </Grid>
            <Grid
              item
              xs={7}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {renderImageArea()}
            </Grid>
          </>
        ) : (
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={4}>
              <Typography variant="h4">Guess the Year</Typography>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                onClick={getMarvelData}
                sx={{
                  px: 1,
                  fontSize: 24,
                  fontWeight: "bold",
                  borderRadius: 3,
                }}
              >
                Play
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>

      <Footer />
    </>
  );
}
