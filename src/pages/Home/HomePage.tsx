import { Box } from "@mui/material";
import FlowlogCard from "../../components/FlowlogCard";
import ImportExport from "../../components/ImportExport";

const HomePage = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <FlowlogCard />
      <ImportExport />
    </Box>
  );
};

export default HomePage;
