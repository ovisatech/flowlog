import React, { useState, useMemo, useCallback } from "react";
import { Box, Modal, Snackbar, Alert } from "@mui/material";
import EntryForm from "../../components/EntryForm/EntryForm";
import debug from "../../utils/debug";
import FlowlogCard from "../../components/FlowlogCard";
import { useEntriesContext } from "../../context/EntriesContext";
import ImportExport from "../../components/ImportExport";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const { entries, updateEntry } = useEntriesContext();

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
      newEntry(newEntry);
      const updatedEntries = recalculateVolumes(
        [newEntry, ...entries],
        calculations.avgFlowRates
      );
      debug("After onNewEntry. Current entries:", entries);
      updatedEntries.forEach((entry) => {
        if (entry.id !== newEntry.id) {
          updateEntry(entry);
        }
      });
      debug("Updated entries after recalculation:", updatedEntries);
      setOpenModal(false);
    },
    [entries, calculations.avgFlowRates, recalculateVolumes, updateEntry]
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <FlowlogCard />
      <ImportExport />

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
