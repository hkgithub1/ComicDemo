import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import ShoppingCart from "./ShoppingCart.js";
import logo from "../images/logo.png";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export default function Header(props) {
  //Authentication varaibles.
  let { user, logoutUser } = useContext(AuthContext);

  //Searchbar variables and handlers.
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = () => {
    const searchBarParams = new URLSearchParams();
    searchBarParams.append("query", searchQuery);
    window.location.replace("/search?" + searchBarParams.toString());
  };

  //Cart variables and handlers
  const [cartState, setCartState] = useState(false);
  const handleCartClose = () => setCartState(false);

  //Dropdown Menu variables and handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [dialogOpen, setDialogOpen] = useState(false);

  const renderAccountMenu = () => {
    if (user) {
      return (
        <>
          <Button color="secondary" variant="text" onClick={handleMenuOpen}>
            {user.username}
          </Button>
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            <MenuList>
              <MenuItem component={Link} to="/account">
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Account Details</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => setDialogOpen(!dialogOpen)}>
                <ListItemIcon>
                  <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      );
    } else {
      return (
        <Button
          color="secondary"
          variant="text"
          component={Link}
          to="/login"
          startIcon={<LoginOutlinedIcon />}
        >
          Login
        </Button>
      );
    }
  };

  return (
    <>
      <Grid
        container
        position="relative"
        bgcolor={props.background}
        height="75px"
        padding={1}
      >
        <Grid item display="flex" alignItems="center" flexGrow={1}>
          <IconButton href="/guess">
            <QuestionMarkOutlinedIcon sx={{ color: "text.white", mr: 2 }} />
          </IconButton>
          <IconButton href="/date">
            <CalendarMonthOutlinedIcon sx={{ color: "text.white", mr: 2 }} />
          </IconButton>
          <Link to={"/"}>
            <img src={logo} alt="logo" height="24px" width="298px" />
          </Link>
        </Grid>

        <Grid item display="flex" alignItems="center" justifyContent="end">
          <TextField
            size="small"
            value={searchQuery}
            color="secondary"
            sx={{ width: 200 }}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearchQuery();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleSearchQuery}>
                  <SearchOutlinedIcon
                    fontSize="small"
                    sx={{ color: "text.white" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {renderAccountMenu()}

          <Dialog onClose={() => setDialogOpen(!dialogOpen)} open={dialogOpen}>
            <Grid
              container
              spacing={3}
              display="flex"
              flexDirection="column"
              height={200}
              width={300}
              alignItems="center"
              justifyContent="center"
              bgcolor="background.main"
            >
              <Grid item>
                <Typography fontWeight="bold">Confirm Logout</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    logoutUser();
                    setDialogOpen(!dialogOpen);
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Dialog>

          <IconButton onClick={() => setCartState(!cartState)}>
            <ShoppingCartOutlinedIcon sx={{ color: "text.white" }} />
            <Typography variant="body1" sx={{ color: "text.white" }}>
              ({cartFromLocalStorage.length})
            </Typography>
          </IconButton>
        </Grid>
      </Grid>

      <ShoppingCart isOpen={cartState} handleCartClose={handleCartClose} />
    </>
  );
}
