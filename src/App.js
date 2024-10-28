import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/Home/HomePage";
import HistoryPage from "./pages/HistoryPage/HistoryPage.tsx";
import { EntriesProvider } from "./context/EntriesContext";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

function App() {
  return (
    <EntriesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
          <CssBaseline />
          <ThemeProvider theme={theme} />
        </Layout>
      </Router>
    </EntriesProvider>
  );
}

export default App;
