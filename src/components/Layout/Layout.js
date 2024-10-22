import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Ovisa Flowlog</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflow: "auto", padding: 2 }}>{children}</Box>

      <BottomNavigation
        value={location.pathname}
        showLabels
        sx={{ width: "100%", position: "fixed", bottom: 0 }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="History"
          value="/history"
          icon={<HistoryIcon />}
          component={Link}
          to="/history"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
