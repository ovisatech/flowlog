import { useState, useEffect, useCallback } from "react";
import debug from "../utils/debug";

const useEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  });

  const loadEntries = useCallback(() => {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const saveEntries = useCallback((newEntries) => {
    localStorage.setItem("entries", JSON.stringify(newEntries));
    setEntries(newEntries);
  }, []);

  const addEntry = useCallback(
    (newEntry) => {
      const updatedEntries = [...entries, newEntry];
      saveEntries(updatedEntries);
      debug("Entry added:", newEntry);
    },
    [entries, saveEntries]
  );

  const deleteEntry = useCallback(
    (index) => {
      const updatedEntries = entries.filter((_, i) => i !== index);
      saveEntries(updatedEntries);
      debug("Entry deleted at index:", index);
    },
    [entries, saveEntries]
  );

  const clearEntries = useCallback(() => {
    saveEntries([]);
    debug("All entries cleared");
  }, [saveEntries]);

  return {
    entries,
    addEntry,
    deleteEntry,
    clearEntries,
    loadEntries,
  };
};

export default useEntries;
