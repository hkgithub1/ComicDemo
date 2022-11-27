import React from "react";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";

export default function CartItemsTable(props) {
  if (props.cartItems != "") {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 550 }} aria-label="Cart Items">
          <TableHead sx={{ bgcolor: props.background }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Issues</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cartItems.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor: "background.main",
                }}
              >
                <TableCell>{row.book_name}</TableCell>
                <TableCell>{row.book_issues}</TableCell>
                <TableCell>{row.book_price}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.removeFromCart(row);
                    }}
                    sx={{ fontSize: 12 }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
