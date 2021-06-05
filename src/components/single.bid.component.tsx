import { Table ,Thead,Th, Tr,Td,TableCaption,Tbody,Tfoot, Button} from "@chakra-ui/react"
import { withRouter } from 'react-router-dom';
const SingleBid =(props)=>{
    return(<Table variant="striped" colorScheme="teal">
        <TableCaption>Bids list</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Created</Th>
            <Th>Created Title</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
            {props.data[props.match.params.id]
            ?.['bids'].map(e=> <Tr>
            <Td>{e.id}</Td>
            <Td>{e.created}</Td>
            <Td >{e.carTitle}</Td>
             <Td >{e.amount}</Td>
            </Tr>)}
        </Tbody>
        <Tfoot>
           <Tr>
            <Th>ID</Th>
            <Th>Created</Th>
            <Th>Created Title</Th>
            <Th>Amount</Th>
          </Tr>
        </Tfoot>
        </Table>)
}
export default withRouter(SingleBid)