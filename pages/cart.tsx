import React, { useEffect, useState } from 'react';
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
import { collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { CartProducts } from '../components/CartProducts'
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import { CashOnDeli } from '../components/CashOnDeli';
import { useRouter } from 'next/router';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export interface IAppProps {
}

export default function App(props: IAppProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //getting current user function
    const { user } = useAuth();
    //state of cart products
    const [cartProducts, setCartProducts] = useState([]);

    const route = useRouter();
    //getting cart product from fb and updating the state
    useEffect(() => {
        if (user) {
            onSnapshot(
                collection(db, "cart " + user.uid),
                (snapShot) => {
                    let list = [] as any;
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setCartProducts(list);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            route.push('/login')
        }
    }, [route,user])

    console.log('day la cartProducts', cartProducts);

    //getting the qty from cartproduct
    const qty = cartProducts.map((carProduct: any) => {
        return carProduct.qty;
    })
    console.log('qty:', qty);

    //reducing the qty in a single value
    const reducerOfQty = (accumlator: any, currentValue: any) => accumlator + currentValue;
    const totalQty = qty.reduce(reducerOfQty, 0);
    console.log('totalQty::', totalQty);


    //getting the TotalProductPrice from cartproduct
    const price = cartProducts.map((cartProduct: any) => {
        return cartProduct.TotalProductPrice;
    })

    //reducing the price in a single value
    const reducerOfPrice = (accumlator: any, currentValue: any) => accumlator + currentValue;
    const totalPrice = price.reduce(reducerOfPrice, 0);
    //global var
    let Product;

    //cart product increase function
    const cartProductIncrease = async (cartProduct: any) => {
        // console.log('day la cartProduct', cartProduct)
        Product = cartProduct;
        console.log('day la cProduct', Product)
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.Price;
        console.log('day la qty', Product.Price)
        console.log('day la total', Product.TotalProductPrice)
        //updating in db
        if (user) {
            const cartRef = doc(db, "cart " + user.uid, cartProduct.id);
            await updateDoc(cartRef, {
                qty: Product.qty,
                TotalProductPrice: Product.TotalProductPrice
            }).then(() => {
                console.log("add!");
            })
        } else {
            console.log('user is not logged in to increment');
        }
    }
    //cart product decrease function
    const cartProductDecrease = async (cartProduct: any) => {
        Product = cartProduct;
        if (Product.qty > 1) {
            Product.qty = Product.qty - 1;
            Product.TotalProductPrice = Product.qty * Product.Price;
            //updating in db
            if (user) {
                const cartRef = doc(db, "cart " + user.uid, cartProduct.id);
                await updateDoc(cartRef, {
                    qty: Product.qty,
                    TotalProductPrice: Product.TotalProductPrice
                }).then(() => {
                    console.log("Decrement!");
                })
            } else {
                console.log('user is not logged in to decrement');
            }
        }

    }
    return (
        <div>
            <div className={styles.namepage}>
                <div className={styles.gridtittle}>
                    <span style={{ color: 'white' }} >Home/Cart</span>
                </div>




            </div>
            <main className={styles.main}>
                {cartProducts.length > 0 && (
                    <div>

                        <h1>Cart</h1>
                        <div>
       

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">PRODUCT</TableCell>
                                            <TableCell align="right">NAME</TableCell>
                                            <TableCell align="right">BRAND</TableCell>
                                            <TableCell align="right">SIZE</TableCell>
                                            <TableCell align="right">PRICE</TableCell>
                                            <TableCell align="right">QUANTITY</TableCell>
                                            <TableCell align="right">SUBTOTAL</TableCell>
                                            <TableCell align="right">DELETE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <CartProducts
                                            cartProducts={cartProducts}
                                            cartProductIncrease={cartProductIncrease}
                                            cartProductDecrease={cartProductDecrease}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className='box'>
                            <h3>Cart Summary</h3>
                            <br />
                            <TableContainer sx={{ maxWidth: 250, textAlign: 'left' }} component={Paper}>
                                <Table sx={{ maxWidth: 450 }} size="small" aria-label="a dense table">
                                    <TableRow>
                                        <TableCell align="right">
                                            <h4>
                                                Total No of Product:
                                            </h4>
                                        </TableCell>
                                        <TableCell align="right">{totalQty}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">
                                            <h4>
                                                Total No of Product:
                                            </h4>
                                        </TableCell>
                                        <TableCell align="right">{totalPrice}$</TableCell>
                                    </TableRow>

                                </Table>
                            </TableContainer>
                            <br />
                            <Button onClick={handleOpen} className={styles.icon}>Checkout</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <CashOnDeli totalPrice={totalPrice} totalQty={totalQty} cartProducts={cartProducts} qty={qty} />
                            </Modal>
                        </div>

                    </div>

                )}
                {cartProducts.length < 1 && (
                    <div>
                        No products to Show
                    </div>
                )}
            </main>
        </div>
    );
}
