import { useState, useEffect, useCallback } from "react";
import debug from "../utils/debug";
import { UrinationEntry } from "../types/UrinationEntry";
import { enrichEntriesWithEstimatedVolume } from "../utils/volumeCalculation";

const useUrinationEntries = () => {
  const LOCAL_STORAGE_KEY_URINATION = "urinationEntries";

  const [urinationEntries, setUrinationEntries] = useState<UrinationEntry[]>(
    []
  );

  const loadUrinationEntries = useCallback(() => {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY_URINATION);
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      debug("Loaded entries from localStorage:", parsedEntries);
      const enrichedEntries = enrichEntriesWithEstimatedVolume(parsedEntries);

      setUrinationEntries(enrichedEntries);
    }
  }, []);

  useEffect(() => {
    loadUrinationEntries();
  }, [loadUrinationEntries]);

  const saveUrinationEntries = useCallback((newEntries: UrinationEntry[]) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_URINATION,
      JSON.stringify(newEntries)
    );
    setUrinationEntries(newEntries);
  }, []);

  const addUrinationEntry = useCallback(
    (newEntry: UrinationEntry) => {
      const enrichedEntries = enrichEntriesWithEstimatedVolume([
        ...urinationEntries,
        newEntry,
      ]);
      saveUrinationEntries(enrichedEntries);
      debug("Entry added:", newEntry);
    },
    [urinationEntries, saveUrinationEntries]
  );

  const deleteUrinationEntry = useCallback(
    (id: string) => {
      const updatedEntries = urinationEntries.filter(
        (entry) => entry.id !== id
      );
      saveUrinationEntries(updatedEntries);
      debug("Entry deleted at id:", id);
    },
    [urinationEntries, saveUrinationEntries]
  );

  const clearUrinationEntries = useCallback(() => {
    saveUrinationEntries([]);
    debug("All entries cleared");
  }, [saveUrinationEntries]);

  const importUrinationEntries = useCallback(
    (importedEntries: UrinationEntry[]) => {
      debug("Importing entries:", importedEntries);
      setUrinationEntries((prevEntries) => {
        const updatedEntries = [...importedEntries, ...prevEntries];
        localStorage.setItem(
          LOCAL_STORAGE_KEY_URINATION,
          JSON.stringify(updatedEntries)
        );
        return updatedEntries;
      });
    },
    []
  );

  return {
    entries: urinationEntries,
    addUrinationEntry,
    deleteUrinationEntry,
    clearUrinationEntries,
    loadUrinationEntries,
    importUrinationEntries,
  };
};

export default useUrinationEntries;
