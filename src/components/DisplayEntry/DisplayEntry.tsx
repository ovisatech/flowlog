import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UrinationEntry } from "../../types/UrinationEntry";
import { LiquidIntakeEntry } from "../../types/LiquidIntakeEntry";
import { WaterDrop, LocalDrink } from "@mui/icons-material";

const DisplayEntry = ({
  entry,
  onDeleteEntry,
}: {
  entry: UrinationEntry | LiquidIntakeEntry;
  onDeleteEntry: (id: string) => void;
}) => {
  const isUrinationEntry = "pressure" in entry;

  const formatDate = (
    date: Date,
    format: string = "YYYY-MM-DD HH:mm"
  ): string => {
    const dateObject = new Date(date);

    const pad = (num: number): string => num.toString().padStart(2, "0");

    const yyyy = dateObject.getFullYear();
    const mm = pad(dateObject.getMonth() + 1);
    const dd = pad(dateObject.getDate());
    const hh = pad(dateObject.getHours());
    const min = pad(dateObject.getMinutes());

    return format
      .replace("YYYY", yyyy.toString())
      .replace("MM", mm)
      .replace("DD", dd)
      .replace("HH", hh)
      .replace("mm", min);
  };

  return (
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingRight: 3,
          color: "primary.main",
        }}
      >
        {isUrinationEntry ? <WaterDrop /> : <LocalDrink />}
      </Box>
      <ListItemText
        primary={`${formatDate(entry.timestamp)}`}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {isUrinationEntry && (
                <>
                  Duration: {entry.durationSeconds} seconds
                  <br />
                </>
              )}
              {isUrinationEntry && (
                <>
                  Pressure: {entry.pressure}
                  <br />
                </>
              )}
              {entry.volumeMl
                ? `Volume: ${entry.volumeMl} ml`
                : isUrinationEntry && "estimatedVolumeMl" in entry
                ? `Estimated Volume: ${entry.estimatedVolumeMl ?? "N/A"} ml`
                : "Estimated Volume: Error"}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default DisplayEntry;
