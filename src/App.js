import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/Home/HomePage";
import HistoryPage from "./pages/HistoryPage/HistoryPage.tsx";
import { EntriesProvider } from "./context/EntriesContext";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/Theme";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <EntriesProvider>
        <Router>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </Layout>
        </Router>
      </EntriesProvider>
    </ThemeProvider>
  );
}

export default App;
