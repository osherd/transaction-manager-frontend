import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface TransactionsListProps {
  title: string;
  transactions: Transaction[];
}

const TransactionsList: FC<TransactionsListProps> = ({
  title,
  transactions,
}) => {
  return (
    <Paper elevation={4}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Counterparty Name</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell component="th" scope="row">
                  {index + 1}: {transaction.counterparty}
                </TableCell>
                <TableCell align="right">
                  ${Math.abs(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionsList;
