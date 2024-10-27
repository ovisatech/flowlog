import React from "react";
import { useEntriesContext } from "../../context/EntriesContext";
import DisplayEntries from "../../components/HistoryView";

const HistoryPage = () => {
  const { urinationEntriesData, liquidEntriesData } = useEntriesContext();
  const { entries: urinationEntries, deleteUrinationEntry } =
    urinationEntriesData;
  const { entries: liquidEntries, deleteLiquidEntry } = liquidEntriesData;

  return (
    <div>
      <h1>Urination History</h1>
      <DisplayEntries
        entries={urinationEntries}
        onDeleteEntry={deleteUrinationEntry}
      />

      <h1>Liquid Intake History</h1>
      <DisplayEntries
        entries={liquidEntries}
        onDeleteEntry={deleteLiquidEntry}
      />
    </div>
  );
};

export default HistoryPage;
