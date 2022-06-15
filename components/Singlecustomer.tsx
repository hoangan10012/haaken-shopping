import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { db } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const Singlecustomer = ({ customer}: any) => {
  console.log(' custeeasd time',customer.timeStamp);
  let date = customer.timeStamp.toDate();
  let mm = date.getMonth()+1;
  let dd = date.getDate();
  let yyyy = date.getFullYear();
  date = mm + '/' + dd + '/' + yyyy;
  return (
    <>
    <TableRow
        key={customer.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell  align="right">{date}</TableCell>
        <TableCell align="right">{customer.Email}</TableCell>
        <TableCell align="right">{customer.Address}</TableCell>
        <TableCell align="right">{customer.Phone}</TableCell>
        <TableCell align="right" > {customer.CartQty}</TableCell>
        <TableCell align="right">{customer.CartPrice}$ </TableCell>
    </TableRow>
</>
  )
}
