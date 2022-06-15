import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }: any) => {
    const { user } = useAuth();
    const handleCartProductIncrease = () => {
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease = () => {
        cartProductDecrease(cartProduct);
    }

    const handleDelete = async () => {
        if (user) {
            await deleteDoc(doc(db, "cart " + user.uid, cartProduct.id));
        }
    }

    return (
        <>
            <TableRow
                key={cartProduct.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="right">
                    <img src={cartProduct.imgURL} style={{ width: 57, height: 61 }} ></img>
                </TableCell>
                <TableCell align="right">{cartProduct.Name}</TableCell>
                <TableCell align="right">{cartProduct.Brand}</TableCell>
                <TableCell align="right">{cartProduct.size}</TableCell>
                <TableCell align="right">{cartProduct.Price}$ </TableCell>
                <TableCell align="right" >
                    <Button onClick={handleCartProductIncrease} >
                        <AddIcon></AddIcon>
                    </Button>
                    <div>{cartProduct.qty}</div>
                    <Button onClick={handleCartProductDecrease} >
                        <RemoveIcon></RemoveIcon>
                    </Button>
                </TableCell>
                <TableCell align="right">{cartProduct.TotalProductPrice}$</TableCell>
                <TableCell align="right"><Button onClick={handleDelete}><DeleteIcon /></Button></TableCell>
            </TableRow>
        </>
    )
}
