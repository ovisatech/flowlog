import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import { useEntriesContext } from "../../context/EntriesContext";
import { FlowPressure } from "../../types/FlowPressure";
import { Stop, Timer } from "@mui/icons-material";
import { theme } from "../../theme";

const AddFlow: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { urinationEntriesData } = useEntriesContext();
  const { addUrinationEntry } = urinationEntriesData;
  const [duration, setDuration] = useState<number>(0);
  const [pressure, setPressure] = useState<FlowPressure>(FlowPressure.MEDIUM);
  const [volume, setVolume] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: number;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setElapsedTime(elapsed);
      }, 99);
    } else {
      setElapsedTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning, startTime]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addUrinationEntry({
      durationSeconds: duration,
      pressure,
      volumeMl: volume ? parseFloat(volume) : undefined,
      notes,
      timestamp: new Date(Date.now()),
    });
    onClose();
    resetForm();
  };

  const handleOnClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDuration(0);
    setPressure(FlowPressure.MEDIUM);
    setVolume("");
    setNotes("");
    setIsTimerRunning(false);
    setElapsedTime(0);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleOnClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: theme.spacing.xl,
          paddingTop: theme.spacing.lg,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.md,
          width: "100%",
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Flow Log
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            label="Duration (seconds)"
            type="number"
            value={isTimerRunning ? elapsedTime : duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
            fullWidth
            disabled={isTimerRunning}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => {
                if (!isTimerRunning) {
                  setStartTime(Date.now());
                  setIsTimerRunning(true);
                } else {
                  setDuration(elapsedTime);
                  setIsTimerRunning(false);
                  setElapsedTime(0);
                }
              }}
            >
              {isTimerRunning ? (
                <Stop color="error" />
              ) : (
                <Timer color="primary" />
              )}
            </IconButton>
          </Box>
        </Box>
        <FormControl fullWidth required>
          <InputLabel>Pressure Strength</InputLabel>
          <Select
            value={pressure}
            label="Pressure Strength"
            onChange={(e) => setPressure(e.target.value as FlowPressure)}
            defaultValue="medium"
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
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isTimerRunning || duration === 0}
        >
          Add Entry
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddFlow;
