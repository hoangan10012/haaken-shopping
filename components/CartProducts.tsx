import React from 'react'
import {IndividualCartProduct} from './IndividualCartProduct'


export const CartProducts = ({cartProducts,cartProductIncrease,cartProductDecrease}:any) => {
  return cartProducts.map((cartProduct:any)=>(
    <IndividualCartProduct 
    key={cartProduct.id} 
    cartProduct={cartProduct} 
    cartProductIncrease={cartProductIncrease}
    cartProductDecrease={cartProductDecrease}
    />

  ))
}
