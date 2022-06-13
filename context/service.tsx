import React, { createContext, useContext, useEffect, useState } from "react";
import {
    collection,
    query,
    getDocs,
    where,
    addDoc,
    getDoc,
    doc,
    setDoc,
    deleteDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'
const getProductList = async () => {
    const q = query(collection(db, "products"));
    const docs = await getDocs(q);
    return docs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
const addProduct = async (job = {}) => {
    try {
        await addDoc(collection(db, "jobs"), job);
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
}
export { getProductList, addProduct }