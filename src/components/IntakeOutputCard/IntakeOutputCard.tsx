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
import { theme } from "../../theme";

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
        marginTop: theme.spacing.cardSpacing,
        boxShadow: theme.shadows.cardWhite,
      }}
      elevation={0}
    >
      <CardHeader
        title="Intake & Output"
        sx={{
          textAlign: "center",
          fontSize: theme.typography.fontSize.cardHeader,
        }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography
              sx={{ fontSize: theme.typography.fontSize.cardSubheader }}
              align="center"
            >
              Total Intake
            </Typography>
            <Typography
              sx={{ fontSize: theme.typography.fontSize.cardText }}
              align="center"
            >
              +{totalIntake} ml
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
            >
              <LocalDrinkIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.iconSize.card,
                }}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Typography
              sx={{ fontSize: theme.typography.fontSize.cardSubheader }}
              align="center"
            >
              Total Output
            </Typography>
            <Typography
              sx={{ fontSize: theme.typography.fontSize.cardText }}
              align="center"
            >
              {totalOutput === undefined ? "N/A" : `-${totalOutput} ml`}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
            >
              <WaterDropIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.iconSize.card,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IntakeOutputCard;
