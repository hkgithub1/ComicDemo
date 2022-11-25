import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import mvd1 from "../images/mvd1.jpg";
import mvd2 from "../images/mvd2.jpg";
import mvd3 from "../images/mvd3.jpg";
import { Box, Stack, Card, TextField, Button } from "@mui/material";

function Signup() {
  //Check if user is logged in and redirects to /. Prevents -1 redirect of login going back to sign up.
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  //Random number generator to decide image display.
  const [imageNumber, setImageNumber] = useState(0);
  const imageArray = [mvd1, mvd2, mvd3];
  useEffect(() => {
    getImageNumber();
  }, []);
  const getImageNumber = () => {
    const min = Math.ceil(0);
    const max = Math.floor(2);
    setImageNumber(Math.floor(Math.random() * (max - min) + min));
  };

  //Form variables and handlers.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
      }),
    };
    fetch("/backend/add-user/", requestOptions).then((response) => {
      if (response.status === 201) {
        alert("User created!");
        navigate("/login");
      } else {
        alert("Something went wrong!");
      }
    });
  };

  return (
    <>
      <Header background="black.light" />

      <Box
        height={600}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ bgcolor: "background.main", borderTop: 1 }}
      >
        <Stack direction="row" sx={{ height: "100%", width: "100%" }}>
          <Box sx={{ height: "100%", width: "40%" }}>
            <img
              src={imageArray[imageNumber]}
              alt="logo2"
              height={600}
              width="100%"
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            sx={{ height: "100%", width: "60%" }}
          >
            <Card sx={{ height: "75%", width: "60%", mt: 7 }}>
              <Stack
                spacing={5}
                sx={{ px: 3, py: 3 }}
                component="form"
                onSubmit={handleSubmit}
              >
                <Stack flexDirection="row" justifyContent="space-between">
                  <TextField
                    size="small"
                    color="secondary"
                    label="First Name"
                    variant="standard"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    size="small"
                    color="secondary"
                    label="Last Name"
                    variant="standard"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Stack>
                <TextField
                  size="small"
                  color="secondary"
                  label="User Name"
                  variant="standard"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  size="small"
                  color="secondary"
                  label="Email"
                  variant="standard"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  size="small"
                  color="secondary"
                  label="Password"
                  variant="standard"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="secondary" type="submit">
                  Create Account
                </Button>
              </Stack>
            </Card>
          </Box>
        </Stack>
      </Box>

      <Footer />
    </>
  );
}

export default Signup;
