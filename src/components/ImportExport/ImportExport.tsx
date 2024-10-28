import { useRef } from "react";
import { Box } from "@mui/material";
import { exportToCSV, importFromCSV } from "../../utils/csvUtils";
import { useEntriesContext } from "../../context/EntriesContext";
import debug from "../../utils/debug";
import StyledButton from "../OutsideCardButton/OutsideCardButton";
import { theme } from "../../theme";

const ImportExport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { urinationEntriesData } = useEntriesContext();
  const { entries: urinationEntries, importUrinationEntries } =
    urinationEntriesData;

  const handleExport = () => {
    exportToCSV(urinationEntries);
  };

  const handleImport = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      importFromCSV(file)
        .then((importedEntries) => {
          importUrinationEntries(importedEntries);
        })
        .catch((error) => {
          debug("Error importing data", error);
        });
    }
  };
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing.cardSpacing,
      }}
    >
      <StyledButton text="Export Data" onClick={handleExport} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImport}
        accept=".csv"
      />
      <StyledButton text="Import Data" onClick={triggerFileInput} />
    </Box>
  );
};

export default ImportExport;
