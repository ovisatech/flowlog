import React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import { Link, useLocation } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WcIcon from "@mui/icons-material/Wc";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";

const Layout = ({ children }) => {
  const location = useLocation();
  const actions = [
    { icon: <LocalDrinkIcon />, name: "Add intake" },
    { icon: <WcIcon />, name: "History" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
        <BottomNavigationAction
          label=""
          icon={
            <Box sx={{ position: "relative", top: 0 }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: -15, left: -25 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>{" "}
            </Box>
          }
          sx={{
            minWidth: "auto",
            padding: 0,
            "& .MuiBottomNavigationAction-label": {
              opacity: 1,
            },
          }}
        />
        <BottomNavigationAction
          label="Statistics"
          value="/statistics"
          icon={<BarChartIcon />}
          component={Link}
          to="/history"
        />
        <BottomNavigationAction
          label="Settings"
          value="/settings"
          icon={<SettingsIcon />}
          component={Link}
          to="/history"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
