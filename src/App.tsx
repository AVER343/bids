import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,Button,
  Code,
  Grid,Alert,AlertIcon,AlertDescription,AlertTitle,CloseButton,
  theme,
} from "@chakra-ui/react"
import { Switch, Route,withRouter, Redirect } from 'react-router-dom';
import {useState} from 'react'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import UserListComponent from "./components/user.list.component"
import SingleBid from "./components/single.bid.component"
import axios from "axios"
import {user,bid} from './interfaces'
interface error{
  message?:string;
}
const App = (props) => {
  const [data,setData]=React.useState<user[]>([])
  const [page,setPage]=React.useState(1)
  const [bool,setBool]=React.useState(null)
  let [totalData,setTotalData]=React.useState<user[]>([])
  const sortList=(key)=>{
    let temp_data = [...data]
   temp_data = bool ? temp_data.sort((a,b)=>a[key]-b[key])
                      :temp_data.sort((a,b)=>b[key]-a[key])
    setBool(!bool)
    setData(temp_data)
  }
  const [error,setError]=React.useState<error>({})
  let getData=async()=>{
    try{
      const data =  await axios.get('https://intense-tor-76305.herokuapp.com/merchants')
      if(data.status==200)
      { 
        data.data = data.data.map((e,i)=>({...e,amount:(e.bids && e.bids.length>0)?
                                              e.bids.sort((a,b)=>b['amount']-a['amount'])[0]['amount']
                                              :0,value_type:'maximum'}))
        setData(data.data)
      }
    }
    catch(e)
    {
      setError(e)
    }
  }
  React.useEffect(() => {
getData()
  }, [])
  return <ChakraProvider theme={theme}>
    <Box marginLeft='auto' marginRight='auto' w="80%" p={4}>
                              <Button onClick={()=>props.history.push('/')}>HOME</Button>
        <Switch>
          <Route exact path='/' render={()=><>
                                      <UserListComponent data={data} setData={setData} page={page} setPage={setPage} sortList={sortList}/>
                                      {page<=1 && page*10<=data.length && <Button onClick={()=>setPage(page+1)}>Next</Button> }
                                      {page>1 && <Button onClick={()=>setPage(page-1)}>Back</Button> }
                                    </>}/>
          <Route path='/bids/:id' exact render={()=><SingleBid data={data}/>}/>
          </Switch>
    </Box>
  </ChakraProvider> 
}
export default withRouter(App)