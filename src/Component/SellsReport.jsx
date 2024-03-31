import React,{useEffect,useState} from 'react'
import {Button} from 'react-bootstrap'
import {Table} from 'react-bootstrap'
import AxiosService from '../utils/ApiService'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import img1 from "../images/img3.avif"

function SellsReport() {
  let navigate = useNavigate()
  let [sell,setSell] = useState([])
  let getsell = async()=>{
    try {
      let res = await AxiosService.get('/sell/getall')
      if(res.status===200)
      {
        console.log(res.data.sell)
        setSell(res.data.sell)
      }
  } catch (error) {
    toast.error(error)
    
  }
  }
  useEffect(()=>{
    getsell()
  },[])

  return <>
  <img src={img1} alt = "Login Image" className='img1'/>
  
  <div className='container contSR'>
  <h1 className="SR1" style={{textAlign:"center",color:"black"}}>Sell Reports!</h1>
  <table className='table2'>
      <thead className='th1'>
        <tr>
        <th>S.No</th>
          <th>Order ID</th>
          <th>Order Date</th>
          <th>Customer Name</th>
          <th>Customer Mobile No</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total Cost</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className='tbody1'>
      {
          sell.map((e,i)=>{
            return<tr key={e._id}>
              {
              console.log(e)}
              <td>{i+1}</td>
              <td>{e.orderID}</td>
              <td>{e.orderDate}</td>
              <td>{e.customerName}</td>
              <td>{e.customerMobile}</td>
              <td>{e.product}</td>
              <td>{e.quantity}</td>
              <td>{e.Cost}</td>
    
              <td><Button variant="dark" onClick={()=>{ navigate(`/sellproduct/${e._id}`)}}>Edit Sell</Button></td>
              
            </tr>
          })
        }
      
        
      </tbody>
      </table>
    </div>
  
  </>
}

export default SellsReport