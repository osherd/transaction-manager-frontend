import { Box, Button, Grid } from "@material-ui/core";
import { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";
import TransactionsList from "./TransactionsList";

const TRANSACTIONS = [
  { id: 1, tradingParty: "me", counterparty: "you", amount: -400 },
  { id: 2, tradingParty: "me", counterparty: "you", amount: 500 },
  { id: 3, tradingParty: "me", counterparty: "someone_else", amount: 100 },
] as Transaction[];

const TransactionManager = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [showTransactionDialog, setShowTransactionDialog] = useState<boolean>(
    false
  );

  const onAdd = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setShowTransactionDialog(false);
  };

  const onClose = () => {
    setShowTransactionDialog(false);
  };

  return (
    <div className="App">
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline"
        spacing={4}
      >
        <Grid item xs={5}>
          <TransactionsList
            title="Paying"
            transactions={transactions.filter(
              (transaction) => transaction.amount < 0
            )}
          />
        </Grid>
        <Grid item xs={5}>
          <TransactionsList
            title="Recieving"
            transactions={transactions.filter(
              (transaction) => transaction.amount > 0
            )}
          />
        </Grid>
      </Grid>

      <Box style={{ marginTop: "5%" }}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="baseline"
        >
          <Grid item xs={3} />
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowTransactionDialog(true)}
            >
              Add new Transaction
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary">
              Compress Transactions
            </Button>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Box>

      <AddTransactionDialog
        open={showTransactionDialog}
        onClose={onClose}
        onAdd={onAdd}
      />
    </div>
  );
};

export default TransactionManager;
