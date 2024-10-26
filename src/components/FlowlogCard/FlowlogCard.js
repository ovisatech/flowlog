import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const FlowlogCard = () => {
  return (
    <Card
      sx={{
        margin: "auto",
        background: "linear-gradient(0, #589BFF 0%, #2A7FFF 100%)",
        color: "white",
        marginBottom: 3,
        paddingBottom: 0,
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexShrink: 0, marginRight: 2 }}>
            <img src="/white.png" alt="Flowlog Logo" width="64" height="64" />
          </Box>
          <Box>
            <Typography variant="h5" component="div">
              Flowlog from Ovisa
            </Typography>
            <Typography variant="body2">
              Track and manage your flow with Ovisa Flowlog
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlowlogCard;
