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

const AddFlow = ({ open, onClose }) => {
  const { addEntry } = useEntriesContext();
  const [duration, setDuration] = useState("");
  const [pressure, setPressure] = useState("");
  const [volume, setVolume] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({
      duration: parseInt(duration),
      pressure,
      volume: volume ? parseFloat(volume) : null,
      notes,
      timestamp: Date.now(),
    });
    onClose();
    // Reset form
    setDuration("");
    setPressure("");
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
            onChange={(e) => setPressure(e.target.value)}
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
