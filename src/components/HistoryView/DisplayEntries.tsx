import { useMemo } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import debug from "../../utils/debug";
import { UrinationEntry } from "../../types/UrinationEntry";
import { LiquidIntakeEntry } from "../../types/LiquidIntakeEntry";

const DisplayEntries = ({
  entries,
  onDeleteEntry,
}: {
  entries: (UrinationEntry | LiquidIntakeEntry)[];
  onDeleteEntry: (id: string) => void;
}) => {
  const { avgFlowRates, entriesWithEstimatedVolume } = useMemo(() => {
    debug("Calculating average flow rates and estimated volumes");
    // Calculate average flow rates
    const flowRates: { [key: string]: number[] } = {
      high: [],
      medium: [],
      low: [],
    };
    entries.forEach((entry) => {
      if (entry.volumeMl && "pressure" in entry) {
        flowRates[entry.pressure].push(entry.volumeMl / entry.durationSeconds);
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
      if (
        !entry.volumeMl &&
        "pressure" in entry &&
        avgFlowRates[entry.pressure] > 0
      ) {
        const estimatedVolume = Math.round(
          avgFlowRates[entry.pressure] * entry.durationSeconds
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
      ></Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Average Volumetric Flow Rates</Typography>
        <Typography>High: {avgFlowRates.high.toFixed(2)} ml/sec</Typography>
        <Typography>Medium: {avgFlowRates.medium.toFixed(2)} ml/sec</Typography>
        <Typography>Low: {avgFlowRates.low.toFixed(2)} ml/sec</Typography>
      </Box>
      <List>
        {entriesWithEstimatedVolume.map((entry) => (
          <ListItem
            key={entry.id}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteEntry(entry.id!)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`Date: ${new Date(entry.timestamp).toLocaleString()}`}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Duration:{" "}
                    {"durationSeconds" in entry ? entry.durationSeconds : "N/A"}{" "}
                    seconds
                    <br />
                    Pressure: {"pressure" in entry ? entry.pressure : "N/A"}
                    <br />
                    {entry.volumeMl ? (
                      `Volume: ${entry.volumeMl} ml`
                    ) : (
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ fontStyle: "italic" }}
                      >
                        Estimated Volume:{" "}
                        {"pressure" in entry
                          ? entry.estimatedVolumeMl || "N/A"
                          : "N/A"}{" "}
                        ml
                      </Typography>
                    )}
                  </Typography>
                  {entry.notes && (
                    <>
                      <br />
                      Note: {entry.notes}
                    </>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DisplayEntries;
