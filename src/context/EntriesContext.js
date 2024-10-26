import React, { createContext, useContext } from "react";
import useEntries from "../hooks/useEntries";

const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const entriesData = useEntries();

  return (
    <EntriesContext.Provider value={entriesData}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntriesContext = () => {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error("useEntriesContext must be used within an EntriesProvider");
  }
  return context;
};
