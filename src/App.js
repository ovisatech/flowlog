import React, { useState, useEffect, useCallback } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import HomePage from "./HomePage";
import debug from "./utils/debug";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#388e3c",
    },
  },
});

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem("urinationEntries");
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      debug("Loaded entries from localStorage:", parsedEntries);
      setEntries(parsedEntries);
    }
  }, []);

  const handleNewEntry = useCallback((entry) => {
    debug("handleNewEntry in App called with:", entry);
    setEntries((prevEntries) => {
      const updatedEntries = [entry, ...prevEntries];
      debug("Updated entries:", updatedEntries);
      localStorage.setItem("urinationEntries", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  }, []);

  const handleDeleteEntry = useCallback((id) => {
    debug("handleDeleteEntry called with id:", id);
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.filter((entry) => entry.id !== id);
      debug("Entries after deletion:", updatedEntries);
      localStorage.setItem("urinationEntries", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  }, []);

  const handleUpdateEntry = useCallback((updatedEntry) => {
    debug("handleUpdateEntry called with:", updatedEntry);
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      );
      debug("Entries after update:", updatedEntries);
      localStorage.setItem("urinationEntries", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  }, []);

  const handleImportEntries = useCallback((importedEntries) => {
    debug("Importing entries:", importedEntries);
    setEntries((prevEntries) => {
      const updatedEntries = [...importedEntries, ...prevEntries];
      localStorage.setItem("urinationEntries", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  }, []);

  debug("App render. Current entries:", entries);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage
        entries={entries}
        onNewEntry={handleNewEntry}
        onDeleteEntry={handleDeleteEntry}
        onUpdateEntry={handleUpdateEntry}
        onImportEntries={handleImportEntries}
      />
    </ThemeProvider>
  );
}

export default App;
