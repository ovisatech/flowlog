import React, { useMemo } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import debug from "../../utils/debug";

const HistoryView = ({ entries, onDeleteEntry, onClose }) => {
  const { avgFlowRates, entriesWithEstimatedVolume } = useMemo(() => {
    debug("Calculating average flow rates and estimated volumes");

    // Calculate average flow rates
    const flowRates = { high: [], medium: [], low: [] };
    entries.forEach((entry) => {
      if (entry.volume) {
        flowRates[entry.pressure].push(entry.volume / entry.duration);
      }
    });

    const avgFlowRates = {
      high: flowRates.high.length
        ? flowRates.high.reduce((a, b) => a + b, 0) / flowRates.high.length
        : 0,
      medium: flowRates.medium.length
        ? flowRates.medium.reduce((a, b) => a + b, 0) / flowRates.medium.length
        : 0,
      low: flowRates.low.length
        ? flowRates.low.reduce((a, b) => a + b, 0) / flowRates.low.length
        : 0,
    };

    // Estimate volumes for entries without logged volumes
    const entriesWithEstimatedVolume = entries.map((entry) => {
      if (!entry.volume && avgFlowRates[entry.pressure] > 0) {
        const estimatedVolume = Math.round(
          avgFlowRates[entry.pressure] * entry.duration
        );
        return { ...entry, estimatedVolume };
      }
      return entry;
    });

    return { avgFlowRates, entriesWithEstimatedVolume };
  }, [entries]);

  debug("Rendering HistoryView with calculated data", {
    avgFlowRates,
    entriesWithEstimatedVolume,
  });

  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, maxHeight: "80vh", overflowY: "auto" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">History</Typography>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Average Volumetric Flow Rates</Typography>
        <Typography>High: {avgFlowRates.high.toFixed(2)} ml/sec</Typography>
        <Typography>Medium: {avgFlowRates.medium.toFixed(2)} ml/sec</Typography>
        <Typography>Low: {avgFlowRates.low.toFixed(2)} ml/sec</Typography>
      </Box>
      <List>
        {entriesWithEstimatedVolume.map((entry) => (
          <ListItem key={entry.id} divider>
            <ListItemText
              primary={`Date: ${new Date(entry.timestamp).toLocaleString()}`}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Duration: {entry.duration} seconds
                    <br />
                    Pressure: {entry.pressure}
                    <br />
                    {entry.volume ? (
                      `Volume: ${entry.volume} ml`
                    ) : (
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ fontStyle: "italic" }}
                      >
                        Estimated Volume: {entry.estimatedVolume || "N/A"} ml
                      </Typography>
                    )}
                  </Typography>
                  {entry.note && (
                    <>
                      <br />
                      Note: {entry.note}
                    </>
                  )}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteEntry(entry.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HistoryView;
