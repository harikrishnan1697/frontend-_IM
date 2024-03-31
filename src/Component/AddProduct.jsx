import React,{useState} from 'react'
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import AxiosService from '../utils/ApiService'
import img2 from "../images/img3.avif"
import { Formik } from 'formik'
import * as Yup from 'yup'

function AddProduct() {
  let navigate = useNavigate()
  const productSchema = Yup.object().shape({
    producttype:Yup.string().required('* Required'),
    productcode:Yup.string().required('* Required'),
    producttitle:Yup.string().required('* Required'),
    costperitem:Yup.string().required('* Required')

  }) 

  let handleProduct = async(values)=>{
    try {
        let res = await AxiosService.post(`/product/create`,values)
        if(res.status===202){
            toast.success(res.data.message)
            navigate('/productreport')
        }
    } 
    catch (error) {
        toast.error(error.response.data.message)
    }
}
  return <>
 <img src={img2} alt = "Login Image" className='img1'/>

 <div className='container contAP'>
 <h1 className="" style={{textAlign:"center",color:"black"}}>Add Product!</h1>
 <Formik
 initialValues={{
  producttype:"",
  productcode:"",
  producttitle:"",
  costperitem:""
 }}
 validationSchema={productSchema}
 onSubmit={(values)=>{
  handleProduct(values)
 }}
 >
  {({ errors,touched,handleBlur,handleSubmit,handleChange})=>(
    <Form onSubmit={handleSubmit}>
 <Form.Group className="mb-3">
        <Form.Label className='text1'>Product Type</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Type" name='producttype' onBlur={handleBlur} onChange={handleChange}/>
        {errors.producttype && touched.producttype ? <div style={{color:"red"}}>{errors.producttype}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='text1'>Product Code</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Code" name='productcode' onBlur={handleBlur} onChange={handleChange}/>
        {errors.productcode && touched.productcode ? <div style={{color:"red"}}>{errors.productcode}</div>:null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label  className='text1' >Product Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Title" name='producttitle' onBlur={handleBlur} onChange={handleChange}/>
        {errors.producttitle && touched.producttitle ? <div style={{color:"red"}}>{errors.producttitle}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='text1'>Cost Per Item</Form.Label>
        <Form.Control type="text"  placeholder="Enter Price Per Unit" name='costperitem' onBlur={handleBlur} onChange={handleChange}/>
        {errors.costperitem && touched.costperitem ? <div style={{color:"red"}}>{errors.costperitem}</div>:null}
      </Form.Group>
      <center><Button variant="dark" type="submit">
        Save Details
      </Button>
      </center>
    </Form>
  )}
</Formik>
  </div>
  </>
}

export default AddProduct