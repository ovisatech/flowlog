import { Card, CardContent, Typography, Box } from "@mui/material";
import packageJson from "../../../package.json";
import { theme } from "../../theme/Theme";

const TitleCard = ({
  title,
  description,
  logoUrl,
}: {
  title: string;
  description?: string;
  logoUrl?: string;
}) => {
  return (
    <Card
      sx={{
        margin: "auto",
        background: theme.primaryLinearGradient,
        color: "white",
        marginBottom: 3,
        boxShadow: theme.shadows.cardColored,
        position: "relative",
      }}
    >
      <CardContent sx={{ padding: theme.spacing.md + "!important" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {logoUrl && (
            <Box sx={{ flexShrink: 0, marginRight: 2 }}>
              <img src={logoUrl} alt="Flowlog Logo" width="64" height="64" />
            </Box>
          )}
          <Box>
            <Typography
              component="div"
              sx={{ fontSize: theme.typography.fontSize.cardHeader }}
            >
              {title}
            </Typography>
            {description && (
              <Typography sx={{ fontSize: theme.typography.fontSize.cardText }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            fontSize: theme.typography.fontSize.smallText,
            top: theme.spacing.sm,
            right: theme.spacing.sm,
          }}
        >
          {packageJson.version}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TitleCard;
