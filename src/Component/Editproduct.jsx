import React,{useState,useEffect} from 'react'
import AxiosService from '../utils/ApiService'
import {Form} from 'react-bootstrap'
import {toast} from "react-toastify"
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Editproduct() {
    let params = useParams()
    let[producttype,setProducttype]= useState("")
    let[productcode,setProductcode]= useState("")
    let[producttitle,setProducttitle]= useState("")
    let[costperitem,setCostperitem]= useState("")
    let[product,setProduct]=useState("")
    let navigate = useNavigate()
    let getProduct = async()=>{
    try {
        let res = await AxiosService.get(`/product/getproducts/${params.id}`)
        if(res.status===200){
            setProducttype(res.data.product.producttype)
            setProductcode(res.data.product.productcode)
            setProducttitle(res.data.product.producttitle)
            setCostperitem(res.data.product.costperitem)
            setProduct(res.data.product)
        }
    } catch (error) {
        toast.error(error)
    }
    
}
useEffect(()=>{
    console.log(params.id)
      if(params.id)
      {
        getProduct()
      }
    },[])
    let editproduct = async()=>{
        try {
            console.log(`${product._id}`)
            let res = await AxiosService.put(`/product/edit/${product._id}`,
            {producttype,productcode,producttitle,costperitem
            })
            if(res.status===200)
            {
                toast.success(res.data.message)
                navigate('/productreport')
            }
        } catch (error) {
            toast.error(error)
        }
    }

return <>
  <div className='container'>
  <Form>
  <Form.Group className="mb-3">
    <Form.Label>Product Type</Form.Label>
    <Form.Control type="text" placeholder="Enter Product" value={producttype} onChange={(e)=>setProducttype(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label>Product code</Form.Label>
    <Form.Control type="text" placeholder="Enter Product" value={productcode} onChange={(e)=>setProductcode(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label>Product Title</Form.Label>
    <Form.Control type="text" placeholder="Enter Product" value={producttitle} onChange={(e)=>setProducttitle(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label>Cost Per Item</Form.Label>
    <Form.Control type="text" placeholder="Enter Product" value={costperitem} onChange={(e)=>setCostperitem(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" onClick={()=>editproduct()}>
          Submit
        </Button>
  </Form>
  </div>
  </>
}

export default Editproduct