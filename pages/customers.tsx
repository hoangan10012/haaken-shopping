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
  
  return (
    <div>
      <main className={styles.main}>
      {customers.length > 0 && (
                    <div>

                        <h1>Customers</h1>
                        <div>
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
                                        <Customerslist
                                            customers={customers}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
