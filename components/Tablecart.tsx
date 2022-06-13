import React, { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { Button, Paper, SxProps } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const Tablecart = () => {
    const [data, setData] = useState<any[]>([]);
    const { user } = useAuth();
    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "cart " + user.uid),
            (snapShot) => {
                let list = [] as any;
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        }
    }, []);
    const actionColumn = [
        {
            field: "changeQty",
            headerName: "ChangeQty",
            width: 200,
            renderCell: (params: any) => {
                return (
                    <div className="cellAction">
                        <Button onClick={handleCartProductDecrease} >
                            <RemoveIcon></RemoveIcon>
                        </Button>
                        <Button onClick={handleCartProductIncrease}>
                            <AddIcon></AddIcon>
                        </Button>
                    </div>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 100,
            renderCell: (params: any) => {
                return (
                    <div className="cellAction">
                        <Button
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];
    const handleCartProductIncrease = async(product:any) => {
        
    }

    const handleCartProductDecrease = () => {
        
    }
    const handleDelete = async (id: any) => {
        try {
            if (user) {
                await deleteDoc(doc(db, "cart " + user.uid, id));
                setData(data.filter((item) => item.id !== id))
            }

        } catch (err) {
            console.log(err);
        }
    };

    console.log("day la id data", data);
    const datagridSx: SxProps = {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 4,
        width: "100%",
        //minHeight: 500,
        height: 500,
        borderRadius: 2,
    };

    return (
        <div>
            <Paper sx={datagridSx}>
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={cartColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </Paper>
        </div>
    )
}
const cartColumns = [
    {
        field: "Product",
        headerName: "Product",
        width: 100,
        renderCell: (params: any) => {
            return (
                <div className="cellWithImg">
                    <img style={{ width: '40px' }} src={params.row.imgURL} />

                </div>
            );
        },
    },
    {
        field: "Name",
        headerName: "name",
        width: 230,
        renderCell: (params: any) => {
            return (
                <div className="cellWithImg">
                    {/* <img src={params.row.imgURL}/> */}

                    {params.row.Name}
                </div>
            );
        },
    },
    {
        field: "Brand",
        headerName: "brand",
        width: 230,
    },

    {
        field: "Price",
        headerName: "Price",
        width: 100,
    },
    {
        field: "qty",
        headerName: "Quanity",
        width: 150,
    },
    {
        field: "TotalProductPrice",
        headerName: "TotalProductPrice",
        width: 100,
    },

    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (params: any) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];
