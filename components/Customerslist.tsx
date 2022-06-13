import React from 'react'
import { Singlecustomer } from './Singlecustomer'

export const Customerslist = ({customers}:any) => {
    return customers.map((customer:any)=>(
        <Singlecustomer 
        key={customer.id} 
        customer={customer} 
        />
      ))
}
