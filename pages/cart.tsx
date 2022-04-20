import * as React from 'react';
import styles from '../styles/cart.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export interface IAppProps {
}
function createData(
    remove: string,
    thumnail: string,
    product: string,
    price: number,
    quantity: number,
    subtotal: number,
    total:number,
) {
    return { remove, thumnail, product, price, quantity, subtotal,total };
}

const rows = [
    createData('×', 'https://haaken.qodeinteractive.com/wp-content/uploads/2020/11/product2-featured-img-300x325.jpg', 'ULI SCARF', 110.00, 1, 110.00,110.00),
];
export default function App(props: IAppProps) {
    return (
        <div>
            <div className={styles.namepage}>
                <div className={styles.gridtittle}>
                    <span style={{ color: 'white' }} >Home/Cart</span>
                </div>
            </div>
            <main className={styles.main}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">PRODUCT</TableCell>
                                <TableCell align="right">PRICE</TableCell>
                                <TableCell align="right">QUANTITY</TableCell>
                                <TableCell align="right">SUBTOTAL</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.product}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">
                                        {row.remove}
                                    </TableCell>
                                    <TableCell align="right">
                                        <img src={row.thumnail} style={{ width: 57, height: 61 }} ></img>
                                    </TableCell>
                                    <TableCell align="right">{row.product}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.subtotal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} style={{paddingTop:50}}>
                    <Grid item xs={8}>
                        <TextField id="standard-basic" label="Coupon code" variant="standard" />
                        <Button style={{marginTop:10}} variant="contained">APPLY COUPON</Button>
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'end',paddingTop:'2%'}}>
                        <Button variant="contained">UPDATE CART</Button>
                    </Grid>
                </Grid>
                <div id='cart-totals'>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"> 
                <TableHead>
                            <TableRow>                            
                                <TableCell align="right">SUBTOTAL</TableCell>
                                <TableCell align="right">TOTAL</TableCell>

                            </TableRow>
                        </TableHead>
               <TableBody>
                    {rows.map((row) => (
                                <TableRow
                                    key={row.product}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >                                  
                                    <TableCell align="right">{row.subtotal}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                </TableRow>
                            ))}
                   </TableBody>   
                </Table>
                     </TableContainer>
                     <Button variant="contained">PROCEED TO CHECKOUT</Button>
                </div>

            </main>
        </div>
    );
}
