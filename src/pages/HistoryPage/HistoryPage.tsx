import { useEntriesContext } from "../../context/EntriesContext";
import DisplayEntry from "../../components/DisplayEntry";
import TitleCard from "../../components/TitleCard/TitleCard";

const HistoryPage = () => {
  const { urinationEntriesData, liquidEntriesData } = useEntriesContext();
  const { entries: urinationEntries, deleteUrinationEntry } =
    urinationEntriesData;
  const { entries: liquidEntries, deleteLiquidEntry } = liquidEntriesData;

  const allEntries = [...urinationEntries, ...liquidEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <>
      <TitleCard title="History" />
      {allEntries.map((entry) => (
        <DisplayEntry
          key={entry.id}
          entry={entry}
          onDeleteEntry={
            "pressure" in entry ? deleteUrinationEntry : deleteLiquidEntry
          }
        />
      ))}
    </>
  );
};

export default HistoryPage;
