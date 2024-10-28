import { Button } from "@mui/material";
import { theme } from "../../theme";

const StyledButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <Button
      sx={{
        outline: `1px solid ${theme.palette.primary.light}`,
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        fontSize: theme.typography.fontSize.cardText,
        textTransform: "none",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
