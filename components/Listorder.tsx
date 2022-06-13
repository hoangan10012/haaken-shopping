import React from 'react'
import { SingleOrder } from './SingleOrder'

export const Listorder = ({orders}:any) => {
    return orders.map((order:any)=>(
        <SingleOrder
        key={orders.id} 
        order={order} 
        />
      ))
}
