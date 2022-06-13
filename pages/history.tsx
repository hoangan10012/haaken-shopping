import React, { useEffect, useState } from 'react';
import styles from '../styles/history.module.css'
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
import { Histories } from '../components/Histories';

export interface  HistoryProps {
}

export default function History (props:  HistoryProps) {
  
  const { user } = useAuth();
  const [histories, setHistories] = useState([]);
  const route = useRouter();

  useEffect(() => {
    if (user) {
        onSnapshot(
            collection(db, "Buyer-Cart " + user.uid),
            (snapShot) => {
                let list = [] as any;
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setHistories(list);
            },
            (error) => {
                console.log(error);
            }
        );
    } else {
        route.push('/login')
    }
}, [route,user])

console.log('day la histories', histories);

  return (
    <div>
      <main className={styles.main}>
      {histories.length > 0 && (
                    <div>

                        <h1>History Buy</h1>
                        <div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">DATE</TableCell>
                                            <TableCell align="right">PRODUCT</TableCell>
                                            <TableCell align="right">NAME</TableCell>
                                            <TableCell align="right">BRAND</TableCell>
                                            <TableCell align="right">SIZE</TableCell>
                                            <TableCell align="right">PRICE</TableCell>
                                            <TableCell align="right">QUANTITY</TableCell>
                                            <TableCell align="right">SUBTOTAL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <Histories
                                            histories={histories}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                    </div>

                )}
                {histories.length < 1 && (
                    <div>
                        No histories to Show
                    </div>
                )}
        
      </main>
    </div>
  );
}
