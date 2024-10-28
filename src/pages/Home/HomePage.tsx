import { Box } from "@mui/material";
import FlowlogCard from "../../components/FlowlogCard";
import ImportExport from "../../components/ImportExport";
import IntakeOutputCard from "../../components/IntakeOutputCard";

const HomePage = () => {
  return (
    <Box>
      <FlowlogCard />
      <ImportExport />
      <IntakeOutputCard />
    </Box>
  );
};

export default HomePage;
