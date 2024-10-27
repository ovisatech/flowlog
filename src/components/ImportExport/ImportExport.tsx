import { useRef } from "react";
import { Box, Button } from "@mui/material";
import { exportToCSV, importFromCSV } from "../../utils/csvUtils";
import { useEntriesContext } from "../../context/EntriesContext";
import debug from "../../utils/debug";

const ImportExport = () => {
  const fileInputRef = useRef(null);
  const { entries, importEntries } = useEntriesContext();

  const handleExport = () => {
    exportToCSV(entries);
  };

  const handleImport = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      importFromCSV(file)
        .then((importedEntries) => {
          importEntries(importedEntries);
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
      sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
    >
      <Button variant="outlined" onClick={handleExport}>
        Export Data
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImport}
        accept=".csv"
      />
      <Button variant="outlined" onClick={triggerFileInput}>
        Import Data
      </Button>
    </Box>
  );
};

export default ImportExport;
