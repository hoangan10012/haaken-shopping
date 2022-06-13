import React from 'react'
import { IndividualHistory } from './IndividualHistory'

export const Histories = ({histories}:any) => {
    return histories.map((historyBuy:any)=>(
        <IndividualHistory 
        key={historyBuy.id} 
        historyBuy={historyBuy} 
        />
      ))
}
