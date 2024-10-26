import React from "react";
import { useEntriesContext } from "../../context/EntriesContext";
import HistoryView from "../../components/HistoryView";

const HistoryPage = () => {
  const { entries, deleteEntry, clearEntries } = useEntriesContext();

  return (
    <div>
      <h1>Historic entries</h1>
      <HistoryView
        entries={entries}
        onDelete={deleteEntry}
        onClear={clearEntries}
      />
    </div>
  );
};

export default HistoryPage;
