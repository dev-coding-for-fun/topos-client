import RouteIssueForm from "./RouteIssueForm";
import Typography from '@mui/material/Typography'
import CssBaseLine from "@mui/material/CssBaseline"

export default function App() {
  return(
    <div>
      <CssBaseLine />
      <Typography variant="h3">Submit Route Issue</Typography>
      <RouteIssueForm />
    </div>
  );
}