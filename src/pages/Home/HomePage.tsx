import ImportExport from "../../components/ImportExport";
import IntakeOutputCard from "../../components/IntakeOutputCard";
import TitleCard from "../../components/TitleCard/TitleCard";

const HomePage = () => {
  return (
    <>
      <TitleCard
        title="Flowlog from Ovisa"
        description="Track and manage your flow with Ovisa Flowlog"
        logoUrl="/white.png"
      />
      <ImportExport />
      <IntakeOutputCard />
    </>
  );
};

export default HomePage;
