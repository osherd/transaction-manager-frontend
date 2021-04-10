import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AddTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (transaction: Transaction) => void;
}

const buildEmptyTransaction = (): Transaction => {
  return {
    id: undefined,
    tradingParty: "me",
    counterparty: "",
    amount: 0,
  };
};

const AddTransactionDialog: FC<AddTransactionDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [transaction, setTransaction] = useState<Transaction>(
    buildEmptyTransaction()
  );

  const handleAdd = () => {
    // copy transaction
    const newTransaction: Transaction = { ...transaction };
    // call add transaction
    onAdd(newTransaction);
    // reset initial transaction
    setTransaction(buildEmptyTransaction());
  };

  const handleClose = () => {
    // reset initial transaction
    setTransaction(buildEmptyTransaction());
    onClose();
  };

  const handleCounterpartyChange = (event: any) => {
    setTransaction({ ...transaction, counterparty: event.target.value });
  };

  const handleAmountChange = (event: any) => {
    setTransaction({ ...transaction, amount: parseInt(event.target.value) });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          variant="outlined"
          margin="dense"
          name="counterparty"
          label="Counterparty"
          type="text"
          fullWidth
          onChange={handleCounterpartyChange}
        />
        <TextField
          variant="outlined"
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          onChange={handleAmountChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionDialog;
