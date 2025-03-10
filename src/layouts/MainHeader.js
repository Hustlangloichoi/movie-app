import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose(); // Close the menu after navigation
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h4" color="inherit" component="div">
            TMDB
          </Typography>

          {/* Movies Menu Button */}
          <Button color="inherit" onClick={handleMenuOpen} sx={{ ml: 2 }}>
            Movies
          </Button>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigate("/popular")}>
              Popular
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("/trending")}>
              Trending
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("/upcoming")}>
              Upcoming
            </MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" color="inherit" component="div">
            Welcome {user?.username}!
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
