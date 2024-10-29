import { useState } from "react";
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
import { theme } from "../../theme";

const AddLiquid = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { liquidEntriesData } = useEntriesContext();
  const { addLiquidEntry } = liquidEntriesData;
  const [volume, setVolume] = useState<string>("");
  const [type, setType] = useState<string>("other");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addLiquidEntry({
      volumeMl: parseFloat(volume),
      notes,
      timestamp: new Date(Date.now()),
      entryType: "liquid",
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setVolume("");
    setType("other");
    setNotes("");
  };

  const handleOnClose = () => {
    resetForm();
    onClose();
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={volume === ""}
        >
          Add Liquid Intake
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddLiquid;
