import React,{useState,useEffect} from 'react'
import AxiosService from '../utils/ApiService'
import {Form} from 'react-bootstrap'
import {toast} from "react-toastify"
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import img1 from "../images/img3.avif"

function Sellproduct() {
    let params = useParams()
    let[orderID,setOrderid]= useState("")
    let[orderDate,setOrderdate]= useState("")
    let[customerName,setCustomername]= useState("")
    let[customerMobile,setCustomermobile]= useState("")
    let[Cost,setCost]= useState("")
    let[product,setProduct]= useState("")
    let[quantity,setQuantity]= useState("")
    let[sell,setSell] = useState("")
    let navigate = useNavigate()
    let getsell = async()=>{
        try {
            let res = await AxiosService.get(`/sell/get/${params.id}`)
            if(res.status===200){
                setOrderid(res.data.sell.orderID)
                setOrderdate(res.data.sell.orderDate)
                setCustomername(res.data.sell.customerName)
                setCustomermobile(res.data.sell.customerMobile)
                setCost(res.data.sell.Cost)
                setProduct(res.data.sell.product)
                setQuantity(res.data.sell.quantity)
                setSell(res.data.sell)
            }
        } catch (error) {
            toast.error(error)
        }
        
    }
    
    useEffect(()=>{
      console.log(params.id)
        if(params.id)
        {
            getsell()
        }
      },[])

    let editsell = async()=>{
        try {
            console.log(`${sell._id}`)
            let res = await AxiosService.put(`/sell/sellproduct/${sell._id}`,
            {orderID,orderDate,customerName,customerMobile,Cost,product,quantity
            })
            if(res.status===200)
            {
                toast.success(res.data.message)
                navigate('/sellsreport')
            }
        } catch (error) {
            toast.error(error)
        }
    }
    

  return <>
  <img src={img1} alt = "Background Image" className='img' />
  
  <div className='container contSP'>
  <h1 style={{textAlign:"center",color:"black"}}>Edit Sell!</h1>
    <form className='form1'>
    
  <Form.Group className="mb-3">
    <Form.Label className='text1'>OrderID</Form.Label>
    <Form.Control type="text" placeholder="Enter OrderID" value={orderID} onChange={(e)=>setOrderid(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label className='text1'>Ordered Date</Form.Label>
        <Form.Control type="text" placeholder="Enter Ordered Date" value={orderDate} onChange={(e)=>setOrderdate(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label className='text1'>Customer Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Customer Name" value={customerName} onChange={(e)=>setCustomername(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label className='text1'>Customer Mobile No</Form.Label>
        <Form.Control type="text" placeholder="Enter Mobile Number" value={customerMobile} onChange={(e)=>setCustomermobile(e.target.value)}/>
      </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label className='text1'>Product</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name" value={product} onChange={(e)=>setProduct(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label className='text1'>Quantity</Form.Label>
        <Form.Control type="number" placeholder="Enter Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
      </Form.Group>
      
     <center>
      <Button  variant="dark" onClick={()=>editsell()}>
          Submit
        </Button>
        </center>
        </form>
        </div>
  </>

}
export default Sellproduct