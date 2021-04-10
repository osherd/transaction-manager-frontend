import { AppBar, Typography } from "@material-ui/core";
import "./App.css";
import TransactionManager from "./components/TransactionManager";

const App = () => {
  return (
    <>
      <AppBar position="static" style={{ alignItems: "center" }}>
        <Typography variant="h4">Transaction Manager</Typography>
      </AppBar>
      <TransactionManager />
    </>
  );
};

export default App;
