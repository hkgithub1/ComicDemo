import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import Header from "../elements/Header.js";
import Footer from "../elements/Footer.js";
import logo2 from "../images/logo2.png";
import warehouse from "../images/warehouse.jpg";
import { Box, Stack, Card, Typography, TextField, Button } from "@mui/material";

function Login() {
  //Login variables and handlers.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let { loginUser } = useContext(AuthContext);

  return (
    <>
      <Header background="black.light" />

      <Box
        height={550}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ bgcolor: "background.secondary", borderTop: 1 }}
      >
        <Card sx={{ height: "80%", width: "60%" }}>
          <Stack direction="row" sx={{ height: "100%", width: "100%" }}>
            <Box
              sx={{ height: "100%", width: "50%" }}
              component="form"
              onSubmit={(e) => loginUser(e, username, password)}
            >
              <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
                <img src={logo2} alt="logo2" height="18px" width="224px" />
              </Box>
              <Stack spacing={2} sx={{ p: 7 }}>
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
                  label="Password"
                  variant="standard"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="secondary" type="submit">
                  Login
                </Button>
                <Typography align="center">Don't have an account?</Typography>
                <Button
                  component={Link}
                  to="/signup"
                  variant="text"
                  color="secondary"
                >
                  Signup
                </Button>
              </Stack>
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "50%",
                backgroundImage: `url(${warehouse})`,
                backgroundSize: "cover",
              }}
            />
          </Stack>
        </Card>
      </Box>

      <Footer />
    </>
  );
}

export default Login;
