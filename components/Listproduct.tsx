import React from 'react'
import { Product } from './Product'

export const Listproduct = ({products}:any) => {
    return products.map((product:any)=>(
        <Product 
        key={product.id} 
        product={product} 
        />
    
      ))
}
