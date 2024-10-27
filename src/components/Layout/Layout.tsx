import React, { useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Fab,
  styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { WaterDrop, LocalDrink, Home, History } from "@mui/icons-material";
import AddFlow from "../AddFlow";
import AddLiquid from "../AddLiquid";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

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
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          boxShadow: 5,
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Home />}
          component={Link}
          to="/"
        />

        {/* Only here to fill the gap, because BottomNavigation only likes to work with 3 or more items. */}
        <BottomNavigationAction />
        <StyledFab>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
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
        </StyledFab>

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
