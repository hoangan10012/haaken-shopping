import React, { useEffect, useState } from "react";
import { db } from '../../config/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { Collections } from "../../components/Collections"
import Grid from '@mui/material/Grid';
import { useAuth } from "../../context/AuthContext";
import { setuid } from "process";
import { useRouter } from "next/router";
import styles from '../../styles/collection.module.css'
import { Filters } from "../../components/Filters";
import { applyInitialState } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
import Breadcum from "../../components/Breadcum";
export interface ColectionProps {
}

export default function Colection(props: ColectionProps) {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductFilter] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [] as any;
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        console.log("day la list", list);
        setProducts(list);
        setProductFilter(list);

      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    }
  }, []);

  const handleChangeProducts = (arrFilter: any) => {
    if (arrFilter.length === 0) {
      setProductFilter(products);
    } else {
      const arr = products.filter(
        (product: any) =>
          arrFilter.includes(product.Brand) ||
          arrFilter.includes(product.Category)
      );
      setProductFilter(arr);
    }
  };
  const sortProducts = (sort: any) => {
    let arrPrice = null;
    switch (sort) {
      case "low": {
        arrPrice = productsFilter.sort((a: any, b: any) => a.Price - b.Price);
        break;
      }
      case "high": {
        arrPrice = productsFilter.sort((a: any, b: any) => b.Price - a.Price);
        break;
      }
      default: {
        arrPrice = products;
      }
    }
    setProductFilter([...arrPrice]);
  };
const[filteredProducts,setFilteredProducts]=useState([]);
const [filters,setFilters]=useState({
  s:''
})
useEffect(()=>{
  let allproducts = products.filter((p:any)=>p.Name.toLowerCase().indexOf(filters.s.toLowerCase())>=0)
  setProductFilter(allproducts);
},[filters]);
console.log('filteredProducts:::',filteredProducts)
  return (
    <div >
      <Breadcum/>
      <main className={styles.main}>
        <div style={{marginTop:'2%',marginBottom:'10%'}} >
          <Grid container spacing={3}>
            <Grid item xs={2} >
              < Filters changeProducts={handleChangeProducts} />
            </Grid>
            <Grid item xs={10}>
              <Collections {...{ productsFilter, sortProducts,filters,setFilters}} />
            </Grid>
          </Grid>
        </div>

      </main>
    </div>
  );
}
