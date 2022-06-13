import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'

export interface  SearchProps {
}

export default function Search (props:  SearchProps) {
    const [data,setData] = useState({});
    const useQuery =()=>{
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let search = query.get("name");
    console.log("search",search);
  return (
    <div>
      <h2>Search</h2>
    </div>
  );
}
