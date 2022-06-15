import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export const SingleOrder = ({ order}: any) => {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (user) {
            await deleteDoc(doc(db, "processing", order.id));
            console.log('order id :',order.id)
        }
    }
    let date = order.data.timeStamp.toDate();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return (
    <>
    <TableRow
        key={order.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell  align="right">{date}</TableCell>
         <TableCell align="right">{order.data.username}</TableCell>
         <TableCell align="right">{order.data.Address}</TableCell>
         <TableCell align="right">{order.data.Phone}</TableCell>
        <TableCell align="right">
            <img src={order.data.imgURL} style={{ width: 57, height: 61 }} ></img>
        </TableCell>
        <TableCell align="right">{order.data.Name}</TableCell>
        <TableCell align="right">{order.data.Brand}</TableCell>
        <TableCell align="right">{order.data.size}</TableCell>
        <TableCell align="right">{order.data.Price}$ </TableCell>
        <TableCell align="right" >{order.data.qty}</TableCell>
        <TableCell align="right">{order.data.TotalProductPrice}$</TableCell>
        <TableCell align="right"><Button onClick={handleDelete}>DONE</Button></TableCell>
    </TableRow>
</>
  )
}
