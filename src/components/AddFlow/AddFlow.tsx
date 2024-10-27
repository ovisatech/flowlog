import React, { useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEntriesContext } from "../../context/EntriesContext";
import { FlowPressure } from "../../types/FlowPressure";

const AddFlow: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { urinationEntriesData } = useEntriesContext();
  const { addUrinationEntry } = urinationEntriesData;
  const [duration, setDuration] = useState<string>("");
  const [pressure, setPressure] = useState<FlowPressure>(FlowPressure.MEDIUM);
  const [volume, setVolume] = useState<string>("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addUrinationEntry({
      durationSeconds: parseInt(duration),
      pressure,
      volumeMl: volume ? parseFloat(volume) : undefined,
      notes,
      timestamp: Date.now().toString(),
    });
    onClose();
    // Reset form
    setDuration("");
    setPressure(FlowPressure.MEDIUM);
    setVolume("");
    setNotes("");
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Flow Log
        </Typography>
        <TextField
          label="Duration (seconds)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          fullWidth
        />
        <FormControl fullWidth required>
          <InputLabel>Pressure Strength</InputLabel>
          <Select
            value={pressure}
            onChange={(e) => setPressure(e.target.value as FlowPressure)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Volume (ml)"
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          fullWidth
        />
        <TextField
          label="Notes (optional)"
          multiline
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Entry
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddFlow;
