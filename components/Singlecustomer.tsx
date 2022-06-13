import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import moment from 'moment';

export const Singlecustomer = ({ customer}: any) => {
  return (
    <>
    <TableRow
        key={customer.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        
    >
        <TableCell  align="right">{moment(customer.timeStamp).format("MMMM dddd,yyyy")}</TableCell>
        <TableCell align="right">{customer.Email}</TableCell>
        <TableCell align="right">{customer.Address}</TableCell>
        <TableCell align="right">{customer.Phone}</TableCell>
        <TableCell align="right" > {customer.CartQty}</TableCell>
        <TableCell align="right">{customer.CartPrice}$ </TableCell>
    </TableRow>
</>
  )
}
