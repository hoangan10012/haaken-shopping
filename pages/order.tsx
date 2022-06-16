import styles from '../styles/order.module.css'
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Listorder } from '../components/Listorder';
import { SingleOrder } from '../components/SingleOrder';
import TablePagination from '@mui/material/TablePagination';
import Breadcum from '../components/Breadcum';
export interface  OrderProps {
}

export default function Order (props:  OrderProps) {
  const { user } = useAuth();
  //state of cart products
  const [orders, setOrders] = useState([]);

  const route = useRouter();
  //getting cart product from fb and updating the state
  useEffect(() => {
      if (user) {
          onSnapshot(
              collection(db, "processing"),
              (snapShot) => {
                  let list = [] as any;
                  snapShot.docs.forEach((doc) => {
                      list.push({ id: doc.id, ...doc.data() });
                  });
                  setOrders(list);
              },
              (error) => {
                  console.log(error);
              }
          );
      } else {
          route.push('/login')
      }
  }, [route,user])

  console.log('day la orders', orders);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };
  return (
    <div>
        <Breadcum/>
        <main className={styles.main}>
        {orders.length > 0 && (
                    <div>
                        <h1> Oders are pending</h1>
                        <div>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">DATE</TableCell>
                                            <TableCell align="right">EMAIL</TableCell>
                                            <TableCell align="right">ADDRESS</TableCell>
                                            <TableCell align="right">PHONE</TableCell>
                                            <TableCell align="right">PRODUCT</TableCell>
                                            <TableCell align="right">NAME</TableCell>
                                            <TableCell align="right">BRAND</TableCell>
                                            <TableCell align="right">SIZE</TableCell>
                                            <TableCell align="right">PRICE</TableCell>
                                            <TableCell align="right">QUANTITY</TableCell>
                                            <TableCell align="right">SUBTOTAL</TableCell>
                                            <TableCell align="right">DONE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* <Listorder
                                            orders={orders}
                                        /> */}
                                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order: any) => (
                                                 <SingleOrder
                                                 key={order.id} 
                                                 order={order} 
                                                 />
                        
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={orders.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>

                    </div>

                )}
                {orders.length < 1 && (
                    <div>
                        No orders to pending
                    </div>
                )}

        </main>
    </div>
  );
}
