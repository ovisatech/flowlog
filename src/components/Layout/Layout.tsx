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
import { theme } from "../../theme";

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
      color: theme.primaryLinearGradient,
      onClick: handleAddLiquidOpen,
    },
    {
      icon: <WaterDrop />,
      name: "Add urination",
      color: theme.primaryLinearGradient,
      onClick: handleAddFlowOpen,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <AddFlow open={isAddFlowOpen} onClose={handleAddFlowClose} />
      <AddLiquid open={isAddLiquidOpen} onClose={handleAddLiquidClose} />

      <Box
        sx={{
          flex: 1,
          padding: 4,
        }}
      >
        {children}
      </Box>

      <BottomNavigation
        value={location.pathname}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          boxShadow: 5,
          height: 65,
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Home />}
          component={Link}
          to="/"
          sx={{
            color: theme.primaryLinearGradient,
          }}
        />

        {/* Only here to fill the gap, because BottomNavigation only likes to work with 3 or more items. */}
        <BottomNavigationAction />
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: "absolute",
            bottom: 65 - 28,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: theme.primaryLinearGradient,
          }}
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
        </SpeedDial>

        <BottomNavigationAction
          label="History"
          value="/history"
          icon={<History />}
          component={Link}
          to="/history"
          sx={{
            color: theme.primaryLinearGradient,
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
