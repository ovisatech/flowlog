import React, { createContext, useContext } from "react";
import useUrinationEntries from "../hooks/useUrinationEntries";
import useLiquidEntries from "../hooks/useLiquidIntakeEntries";

const EntriesContext = createContext<{
  urinationEntriesData: ReturnType<typeof useUrinationEntries>;
  liquidEntriesData: ReturnType<typeof useLiquidEntries>;
} | null>(null);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const urinationEntriesData = useUrinationEntries();
  const liquidEntriesData = useLiquidEntries();

  return (
    <EntriesContext.Provider
      value={{ urinationEntriesData, liquidEntriesData }}
    >
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
