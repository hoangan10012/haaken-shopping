import React, { useEffect, useState } from 'react';
import styles from '../styles/customer.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '../context/AuthContext';
import { collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useRouter } from 'next/router';
import {Customerslist} from '../components/Customerslist'
import { Singlecustomer } from '../components/Singlecustomer';
import TablePagination from '@mui/material/TablePagination';
import Breadcum from '../components/Breadcum';
export interface  CustomersProps {
}

export default function Customers (props:  CustomersProps) {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const route = useRouter();

  useEffect(() => {
    if (user) {
        onSnapshot(
            collection(db, "Buyer-Personal-Info"),
            (snapShot) => {
                let list = [] as any;
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setCustomers(list);
            },
            (error) => {
                console.log(error);
            }
        );
    } else {
        route.push('/login')
    }
}, [route,user])

console.log('day la customers', customers);
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
      {customers.length > 0 && (
                    <div>
                        <h1>Customers</h1>
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
                                            <TableCell align="right">TOTAL QUANTITY</TableCell>
                                            <TableCell align="right">TOTAL PRICE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* <Customerslist
                                            customers={customers}
                                        /> */}
                                        {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer: any) => (
                                                <Singlecustomer 
                                                key={customer.id} 
                                                customer={customer} 
                                                />
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={customers.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>

                    </div>

                )}
                {customers.length < 1 && (
                    <div>
                        No customer to Show
                    </div>
                )}

      </main>
    </div>
  );
}
