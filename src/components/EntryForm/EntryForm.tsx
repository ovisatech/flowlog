import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";

const EntryForm: React.FC<{ onSubmit: (entry: any) => void }> = ({
  onSubmit,
}) => {
  const [duration, setDuration] = useState<string>("");
  const [pressure, setPressure] = useState<"high" | "medium" | "low">("medium");
  const [volume, setVolume] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const entry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      duration: parseInt(duration, 10),
      pressure,
      volume: volume ? parseInt(volume, 10) : null,
      note: note || null,
    };
    onSubmit(entry);
    setDuration("");
    setPressure("medium");
    setVolume("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          type="number"
          label="Duration (seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Pressure</InputLabel>
          <Select
            value={pressure}
            onChange={(e) =>
              setPressure(e.target.value as "high" | "medium" | "low")
            }
            label="Pressure"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Volume (ml, optional)"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          fullWidth
        />
        <TextField
          label="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save Entry
        </Button>
      </Box>
    </form>
  );
};

export default EntryForm;
