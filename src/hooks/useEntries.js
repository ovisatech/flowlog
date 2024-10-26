import { useState, useEffect, useCallback } from "react";
import debug from "../utils/debug";

const useEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  });

  const loadEntries = useCallback(() => {
    const storedEntries = localStorage.getItem("urinationEntries");
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      debug("Loaded entries from localStorage:", parsedEntries);
      setEntries(parsedEntries);
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

  const importEntries = useCallback((importedEntries) => {
    debug("Importing entries:", importedEntries);
    setEntries((prevEntries) => {
      const updatedEntries = [...importedEntries, ...prevEntries];
      localStorage.setItem("urinationEntries", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  }, []);

  return {
    entries,
    addEntry,
    deleteEntry,
    clearEntries,
    loadEntries,
    importEntries,
  };
};

export default useEntries;
