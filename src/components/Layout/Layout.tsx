import React, { useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { WaterDrop, LocalDrink, Home, History } from "@mui/icons-material";
import AddFlow from "../AddFlow";
import AddLiquid from "../AddLiquid";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAddFlowOpen, setIsAddFlowOpen] = useState(false);
  const [isAddLiquidOpen, setIsAddLiquidOpen] = useState(false);
  const location = useLocation();

  const handleAddFlowOpen = () => {
    setIsAddFlowOpen(true);
  };

  const handleAddFlowClose = () => {
    setIsAddFlowOpen(false);
  };

  const handleAddLiquidOpen = () => {
    setIsAddLiquidOpen(true);
  };

  const handleAddLiquidClose = () => {
    setIsAddLiquidOpen(false);
  };

  const actions = [
    {
      icon: <LocalDrink />,
      name: "Add intake",
      onClick: handleAddLiquidOpen,
    },
    {
      icon: <WaterDrop />,
      name: "Add urination",
      onClick: handleAddFlowOpen,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AddFlow open={isAddFlowOpen} onClose={handleAddFlowClose} />
      <AddLiquid open={isAddLiquidOpen} onClose={handleAddLiquidClose} />

      <Box sx={{ flex: 1, overflow: "auto", padding: 2 }}>{children}</Box>

      <BottomNavigation
        value={location.pathname}
        showLabels
        sx={{ width: "100%", position: "fixed", bottom: 0 }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Home />}
          component={Link}
          to="/"
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
                    onClick={action.onClick}
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
          label="History"
          value="/history"
          icon={<History />}
          component={Link}
          to="/history"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
