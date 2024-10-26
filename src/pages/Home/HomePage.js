import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import EntryForm from "../../components/EntryForm/EntryForm";
import debug from "../../utils/debug";
import { exportToCSV, importFromCSV } from "../../utils/csvUtils";
import FlowlogCard from "../../components/FlowlogCard";
const HomePage = ({ entries, onNewEntry, onUpdateEntry, onImportEntries }) => {
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const fileInputRef = useRef(null);

  debug("HomePage render. Current entries:", entries);

  const calculations = useMemo(() => {
    debug("Recalculating stats");
    let totalDuration = 0;
    let totalAmount = 0;
    let totalTimeBetween = 0;
    let flowRates = { high: [], medium: [], low: [] };
    let entriesWithVolume = 0;

    entries.forEach((entry, index) => {
      totalDuration += entry.duration;
      if (entry.volume) {
        totalAmount += entry.volume;
        entriesWithVolume++;
        flowRates[entry.pressure].push(entry.volume / entry.duration);
      }
      if (index > 0) {
        totalTimeBetween += entries[index - 1].timestamp - entry.timestamp;
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

    return {
      avgDuration: entries.length ? totalDuration / entries.length : 0,
      avgTimeBetween:
        entries.length > 1
          ? totalTimeBetween / (entries.length - 1) / (1000 * 60)
          : 0,
      avgAmount: entriesWithVolume ? totalAmount / entriesWithVolume : 0,
      avgFlowRates,
    };
  }, [entries]);

  const handleExport = () => {
    exportToCSV(entries);
    setSnackbar({
      open: true,
      message: "Data exported successfully",
      severity: "success",
    });
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      importFromCSV(file)
        .then((importedEntries) => {
          onImportEntries(importedEntries);
          setSnackbar({
            open: true,
            message: "Data imported successfully",
            severity: "success",
          });
        })
        .catch((error) => {
          debug("Error importing data", error);
          setSnackbar({
            open: true,
            message: "Error importing data",
            severity: "error",
          });
        });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const recalculateVolumes = useCallback((entries, avgFlowRates) => {
    debug("Recalculating volumes", { entries, avgFlowRates });
    return entries.map((entry) => {
      if (!entry.volume && avgFlowRates[entry.pressure] > 0) {
        const calculatedVolume = Math.round(
          avgFlowRates[entry.pressure] * entry.duration
        );
        return { ...entry, calculatedVolume };
      }
      return entry;
    });
  }, []);

  const handleNewEntry = useCallback(
    (newEntry) => {
      debug("handleNewEntry called with:", newEntry);
      onNewEntry(newEntry);
      const updatedEntries = recalculateVolumes(
        [newEntry, ...entries],
        calculations.avgFlowRates
      );
      debug("After onNewEntry. Current entries:", entries);
      updatedEntries.forEach((entry) => {
        if (entry.id !== newEntry.id) {
          onUpdateEntry(entry);
        }
      });
      debug("Updated entries after recalculation:", updatedEntries);
      setOpenModal(false);
    },
    [
      onNewEntry,
      entries,
      calculations.avgFlowRates,
      recalculateVolumes,
      onUpdateEntry,
    ]
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <FlowlogCard />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button variant="outlined" onClick={handleExport}>
          Export Data
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImport}
          accept=".csv"
        />
        <Button variant="outlined" onClick={triggerFileInput}>
          Import Data
        </Button>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Avg. Duration</Typography>
            <Typography variant="h6">
              {calculations.avgDuration.toFixed(1)} sec
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Avg. Time Between</Typography>
            <Typography variant="h6">
              {calculations.avgTimeBetween.toFixed(1)} min
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Avg. Amount</Typography>
            <Typography variant="h6">
              {calculations.avgAmount.toFixed(0)} ml
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Avg. Volumetric Flow Rates
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">High Pressure</Typography>
            <Typography variant="h6">
              {calculations.avgFlowRates.high.toFixed(2)} ml/sec
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Medium Pressure</Typography>
            <Typography variant="h6">
              {calculations.avgFlowRates.medium.toFixed(2)} ml/sec
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Low Pressure</Typography>
            <Typography variant="h6">
              {calculations.avgFlowRates.low.toFixed(2)} ml/sec
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <EntryForm onSubmit={handleNewEntry} />
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
