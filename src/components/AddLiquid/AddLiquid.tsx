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

const AddLiquid = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { addEntry } = useEntriesContext();
  const [volume, setVolume] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addEntry({
      volume: parseFloat(volume),
      type,
      notes,
      timestamp: Date.now(),
      entryType: "liquid",
    });
    onClose();
    setVolume("");
    setType("");
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
          Add Liquid Intake
        </Typography>
        <TextField
          label="Volume (ml)"
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          required
          fullWidth
        />
        <FormControl fullWidth required>
          <InputLabel>Liquid Type</InputLabel>
          <Select
            value={type}
            label="Liquid Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="water">Water</MenuItem>
            <MenuItem value="coffee">Coffee</MenuItem>
            <MenuItem value="tea">Tea</MenuItem>
            <MenuItem value="soda">Soda</MenuItem>
            <MenuItem value="juice">Juice</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Notes"
          multiline
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Liquid Intake
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddLiquid;
