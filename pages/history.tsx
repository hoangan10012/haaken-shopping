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
import Breadcum from '../components/Breadcum';
import TablePagination from '@mui/material/TablePagination';

import { IndividualHistory } from '../components/IndividualHistory'
export interface HistoryProps {
}

export default function History(props: HistoryProps) {

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
    }, [route, user])

    console.log('day la histories', histories);
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
            <Breadcum />
            <main className={styles.main}>
                {histories.length > 0 && (
                    <div>

                        <h1>History Buy</h1>
                        <div>
                            <Paper sx={{ width: '100%', mb: 2 }}>
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
                                            {histories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historyBuy: any) => (
                                                <IndividualHistory
                                                    key={historyBuy.id}
                                                    historyBuy={historyBuy}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={histories.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
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
