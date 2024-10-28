import { Box } from "@mui/material";
import FlowlogCard from "../../components/FlowlogCard";
import ImportExport from "../../components/ImportExport";
import IntakeOutputCard from "../../components/IntakeOutputCard";

const HomePage = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <FlowlogCard />
      <ImportExport />
      <IntakeOutputCard totalIntake={0} totalOutput={0} />
    </Box>
  );
};

export default HomePage;
