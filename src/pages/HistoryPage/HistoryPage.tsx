import { useEntriesContext } from "../../context/EntriesContext";
import { Box } from "@mui/material";
import FlowlogCard from "../../components/FlowlogCard";
import DisplayEntry from "../../components/DisplayEntry";

const HistoryPage = () => {
  const { urinationEntriesData, liquidEntriesData } = useEntriesContext();
  const { entries: urinationEntries, deleteUrinationEntry } =
    urinationEntriesData;
  const { entries: liquidEntries, deleteLiquidEntry } = liquidEntriesData;

  const allEntries = [...urinationEntries, ...liquidEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Box>
      <FlowlogCard />
      <h1>History</h1>
      {allEntries.map((entry) => (
        <DisplayEntry
          key={entry.id}
          entry={entry}
          onDeleteEntry={
            "pressure" in entry ? deleteUrinationEntry : deleteLiquidEntry
          }
        />
      ))}
    </Box>
  );
};

export default HistoryPage;
