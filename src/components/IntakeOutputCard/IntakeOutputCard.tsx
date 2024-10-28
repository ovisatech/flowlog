import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid2 as Grid,
  Box,
} from "@mui/material";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useEntriesContext } from "../../context/EntriesContext";

const IntakeOutputCard: React.FC = () => {
  const { urinationEntriesData, liquidEntriesData } = useEntriesContext();
  const { entries: urinationEntries } = urinationEntriesData;
  const { entries: liquidEntries } = liquidEntriesData;

  const totalIntake = liquidEntries.reduce(
    (sum, entry) => sum + entry.volumeMl,
    0
  );

  let totalOutput = undefined;
  const filteredUrinationEntries = urinationEntries.filter(
    (e) => e.volumeMl || e.estimatedVolumeMl
  );
  if (filteredUrinationEntries.length !== 0) {
    totalOutput = filteredUrinationEntries.reduce(
      (sum, entry) => sum + (entry.volumeMl ?? entry.estimatedVolumeMl ?? 0),
      0
    );
  }

  return (
    <Card
      sx={{
        marginTop: 3,
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      elevation={0}
    >
      <CardHeader title="Intake & Output" sx={{ textAlign: "center" }} />
      <CardContent sx={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="h6" align="center">
              Total Intake
            </Typography>
            <Typography variant="h5" align="center">
              +{totalIntake} mL
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
            >
              <LocalDrinkIcon sx={{ color: "#2A7FFF", fontSize: 20 }} />
            </Box>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" align="center">
              Total Output
            </Typography>
            <Typography variant="h5" align="center">
              {totalOutput === undefined ? "N/A" : `-${totalOutput} mL`}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
            >
              <WaterDropIcon sx={{ color: "#2A7FFF", fontSize: 20 }} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IntakeOutputCard;
