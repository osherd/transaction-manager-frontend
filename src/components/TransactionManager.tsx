import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import AddTransactionDialog from "./AddTransactionDialog";
import TransactionsList from "./TransactionsList";

const TransactionManager = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactionDialog, setShowTransactionDialog] = useState<boolean>(
    false
  );

  useEffect(() => {
    const fetchTransactionsData = async () => {
      const response = await fetch("/api/transactions");
      const transactionsFromAPI = await response.json();
      setTransactions(transactionsFromAPI as Transaction[]);
    }
    fetchTransactionsData()
  }, []);


  const onAdd = (transaction: Transaction) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    }


    fetch("/api/transactions", requestOptions)
      .then((res) => res.json())
      .then((transactionFromAPI) =>
        setTransactions([...transactions, transactionFromAPI as Transaction])
      );
    setShowTransactionDialog(false);
  };

  const onClose = () => {
    setShowTransactionDialog(false);
  };

  const handleCompress = () => {
    fetch("api/transactions/compressed")
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = file;
        a.setAttribute("download", "compressedTransactions.csv");
        a.click();
      });
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompress}
            >
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
