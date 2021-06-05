import { Table ,Thead,Th, Tr,Td,TableCaption,Tbody,Tfoot, Button} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {user,bid} from '../interfaces'
import {withRouter} from 'react-router-dom'
const UserListComponent=(props)=>{

  useEffect(()=>{
  },[props.data.filter(e=>e['value_type']).length])
  return (<Table variant="simple">
  <TableCaption>Users with Minimum/maximum bids !</TableCaption>
  <Thead>
    <Tr>
      <Th onClick={()=>{
        props.sortList('id')
      }}>ID</Th>
      <Th onClick={()=>{
        props.sortList('firstname')
      }}>Fullname</Th>
      <Th isNumeric onClick={()=>{
        props.sortList('amount')
      }}>Amount</Th>
      <Th >Value type</Th>
    </Tr>
  </Thead>
  <Tbody>
    {props.data.map((e,i)=>i>=(props.page-1)*10 && i<= props.page*10-1 ?
         <Tr key={i}>
        <Td onClick={()=>props.history.push('/bids/'+i)}>{e.id}</Td>
        <Td onClick={()=>props.history.push('/bids/'+i)}>{e.firstname +' '+ e.lastname}</Td>
        <Td onClick={()=>props.history.push('/bids/'+i)} isNumeric>{e.amount}</Td>
        <Button onClick={()=>{
          if(e.value_type=='maximum')
          {
            let temp_data = [...props.data] 
            temp_data[i]['value_type']='minimum'
            temp_data[i]['amount'] = (e.bids && e.bids.length>0)?
                                      e.bids.sort((a,b)=>a['amount']-b['amount'])[0]['amount']
                                      :0
            props.setData(temp_data)
          }
          else{
           
              let temp_data = [...props.data] 
            temp_data[i]['value_type']='maximum'
            temp_data[i]['amount'] = (e.bids && e.bids.length>0)?
                                      e.bids.sort((a,b)=>a['amount']-b['amount'])[e.bids.length-1]['amount']
                                      :0
            props.setData(temp_data)
          }
        }}>{e.value_type}</Button>
      </Tr>:null
    )}
  </Tbody>
  <Tfoot>
     <Tr>
      <Th>ID</Th>
      <Th>Fullname</Th>
      <Th isNumeric onClick={()=>{
        props.sortList('amount')
      }}>Amount</Th>
      <Th >Value type</Th>
    </Tr>
  </Tfoot>
</Table>)
}
export default withRouter(UserListComponent)