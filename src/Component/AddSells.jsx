import React,{useState} from 'react'
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../utils/ApiService'
import {toast} from "react-toastify"
import img1 from '../images/img3.avif'
import { Formik } from 'formik'
import * as Yup from 'yup'

function AddSells() {
  let navigate = useNavigate()
  const sellSchema = Yup.object().shape({
    orderID:Yup.string().required('* Required'),
    customerName:Yup.string().required('* Required'),
    customerMobile:Yup.string().required('* Required'),
  })
  let handleSell = async(values)=>{
    try {
        let res = await AxiosService.post(`/sell/create`,values)
        if(res.status===202){
            toast.success(res.data.message)
            navigate('/sellsreport')
        }
    } 
    catch (error) {
        toast.error(error)
    }
  }
  return <>
  <img src={img1} alt = "Login Image" className='img1'/>
  
  <div className='container contAS'>
  <h1 className="AS1" style={{textAlign:"center",color:"black"}}>Add Sell!</h1> 
  <Formik 
  initialValues={{
    orderID:"",
    customerName:"",
    customerMobile:""

  }}
  validationSchema={sellSchema}
  onSubmit={(values)=>{
    handleSell(values)
  }}
  >
{({ errors,touched,handleBlur,handleSubmit,handleChange})=>(
  <Form className='form2' onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
        <Form.Label className='text1'>Order ID</Form.Label>
        <Form.Control type="text" placeholder="Enter OrderID" name='orderID' onBlur={handleBlur} onChange={handleChange}/>
        {errors.orderID && touched.orderID ? <div style={{color:"red"}}>{errors.orderID}</div>:null}       
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='text1'>Customer Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Customer Name" name='customerName' onBlur={handleBlur} onChange={handleChange}/>
        {errors.customerName && touched.customerName ? <div style={{color:"red"}}>{errors.customerName}</div>:null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='text1'>Customer Mobile</Form.Label>
        <Form.Control type="text" placeholder="Enter Customer Mobile No" name='customerMobile' onBlur={handleBlur} onChange={handleChange}/>
        {errors.customerMobile && touched.customerMobile ? <div style={{color:"red"}}>{errors.customerMobile}</div>:null}
      </Form.Group>
      <center><Button  variant="dark" type="submit">
        Submit
      </Button>
      </center>
    </Form>
)}
    
</Formik>
</div>
  </>
}
export default AddSells