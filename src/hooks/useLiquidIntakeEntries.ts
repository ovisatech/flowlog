import { useState, useEffect, useCallback } from "react";
import debug from "../utils/debug";
import { LiquidIntakeEntry } from "../types/LiquidIntakeEntry";

const useLiquidIntakeEntries = () => {
  const LOCAL_STORAGE_KEY_LIQUID_INTAKE = "liquidEntries";

  const [LiquidEntries, setLiquidEntries] = useState<LiquidIntakeEntry[]>([]);

  const loadLiquidEntries = useCallback(() => {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY_LIQUID_INTAKE);
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      debug("Loaded entries from localStorage:", parsedEntries);
      setLiquidEntries(parsedEntries);
    }
  }, []);

  useEffect(() => {
    loadLiquidEntries();
  }, [loadLiquidEntries]);

  const saveLiquidEntries = useCallback((newEntries: any[]) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_LIQUID_INTAKE,
      JSON.stringify(newEntries)
    );
    setLiquidEntries(newEntries);
  }, []);

  const addLiquidEntry = useCallback(
    (newEntry: any) => {
      const updatedEntries = [...LiquidEntries, newEntry];
      saveLiquidEntries(updatedEntries);
      debug("Entry added:", newEntry);
    },
    [LiquidEntries, saveLiquidEntries]
  );

  const deleteLiquidEntry = useCallback(
    (id: string) => {
      const updatedEntries = LiquidEntries.filter((entry) => entry.id !== id);
      saveLiquidEntries(updatedEntries);
      debug("Entry deleted:", id);
    },
    [LiquidEntries, saveLiquidEntries]
  );

  const clearLiquidEntries = useCallback(() => {
    saveLiquidEntries([]);
    debug("All entries cleared");
  }, [saveLiquidEntries]);

  const importLiquidEntries = useCallback((importedEntries: any[]) => {
    debug("Importing entries:", importedEntries);
    setLiquidEntries((prevEntries) => {
      const updatedEntries = [...importedEntries, ...prevEntries];
      localStorage.setItem(
        LOCAL_STORAGE_KEY_LIQUID_INTAKE,
        JSON.stringify(updatedEntries)
      );
      return updatedEntries;
    });
  }, []);

  return {
    entries: LiquidEntries,
    addLiquidEntry,
    deleteLiquidEntry,
    clearLiquidEntries,
    loadLiquidEntries,
    importLiquidEntries,
  };
};

export default useLiquidIntakeEntries;
