export const theme = {
  palette: {
    primary: {
      main: "#2A7FFF",
      light: "#63A0FA",
      dark: "#1166E7",
    },
    secondary: {
      main: "#6c757d",
      light: "#868e96",
      dark: "#495057",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    primaryLinearGradient: "linear-gradient(#1166E7, #63A0FA)",
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    cardSpacing: "24px",
  },
  iconSize: {
    menu: "24px",
    button: "20px",
    card: "24px",
  },
  typography: {
    fontFamily: {
      primary: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    fontSize: {
      header: "24px",
      cardHeader: "24px",
      cardSubheader: "18px",
      cardText: "14px",
      smallText: "8px",
    },
  },
  shadows: {
    cardWhite: "4px 4px 10px rgba(0, 0, 0, 0.1)",
    cardColored: "4px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};

export type Theme = typeof theme;
