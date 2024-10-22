import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/Home/HomePage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import debug from "./utils/debug";
import { EntriesProvider } from "./context/EntriesContext";
import Layout from "./components/Layout/Layout";

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
    <EntriesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  entries={entries}
                  onNewEntry={handleNewEntry}
                  onDeleteEntry={handleDeleteEntry}
                  onUpdateEntry={handleUpdateEntry}
                  onImportEntries={handleImportEntries}
                />
              }
            />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
          <CssBaseline />
        </Layout>
      </Router>
    </EntriesProvider>
  );
}

export default App;
