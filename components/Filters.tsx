import React, { useEffect, useState } from "react";
import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import { collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Filter = ({ filter, changeProducts }: any) => {
  const key = Object.keys(filter);
  const arr = Object.values(filter)[0] as any;
  const checkbox = useCheckboxState([] as any);
 

  const onValue = (e:any, value:any) => {
    let valueSelected = null;
    if (e.target.checked) {
      valueSelected = [...(checkbox.state || [] as any), value];
      changeProducts(valueSelected);
    } else {
      valueSelected = (checkbox.state as any[]).filter((item:any) => item != value);
    }
    checkbox.setState(valueSelected);
    changeProducts(valueSelected);
  };
  return (
    <div className="mt-5">
    <h3 className="text-xl capitalize mb-3">{key}</h3>
    {arr.map((item:any, index:any) => (
      <div className="text-lg" key={index}>
        <Checkbox
          color="info-o"
          animation="pulse"
          onChange={(e) => onValue(e, item)}
        >
          {item}
        </Checkbox>
      </div>
    ))}
  </div>
  );
}

export const Filters = ({ changeProducts }:any) => {
  const [filters, setFilters] = useState(null) as any;
  useEffect(()=>{
    onSnapshot(
      collection(db, "filter"),
      (snapShot) => {
          let list = [] as any;
          snapShot.docs.forEach((doc) => {
              list.push({...doc.data()});
          });
          setFilters(list);
      },
      (error) => {
          console.log(error);
      }
  );
  },[])
  // console.log("day la filter",filters)
  return (
    <div style={{marginLeft:'20%'}}>
    <h1 className="text-2xl">Filters</h1>
    {filters?.map((filter:any, index:any) => (
      <Filter key={index} filter={filter} changeProducts={changeProducts} />
    ))}
  </div>
  )
}
