import React from 'react'
import { IndividualHistory } from './IndividualHistory'

export const Histories = ({histories}:any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
    return histories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historyBuy:any)=>(
        <IndividualHistory 
        key={historyBuy.id} 
        historyBuy={historyBuy} 
        />
      ))
}
