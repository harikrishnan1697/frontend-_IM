import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import AxiosService from '../utils/ApiService'
import img from "../images/img2.jfif"
import { Formik } from 'formik'
import * as Yup from 'yup'

function Login() {
let navigate = useNavigate()
    const loginSchema = Yup.object().shape({
      email:Yup.string().required('* Required'),
      password:Yup.string().required('* Required'),
    })
    let handleLogin = async(values)=>{
        try {
            let res = await AxiosService.post(`/user/login`,values)
            if(res.status===200){
                toast.success(res.data.message)
                navigate('/productreport')
            }
        } 
        catch (error) {
            toast.error(error.response.data.message)
        }
    }
return <>
<img src={img} alt = "Login Image" className='img'/>
    
    <div className='container login' style={{position:'absolute'}}>
    <h1 className="logo" style={{textAlign:"center"}}>Login Here!</h1>
  <Formik initialValues={{
    email:"",
    password:""
  }}
  validationSchema={loginSchema}
  onSubmit={(values)=>{
    handleLogin(values)
  }}
>
{({ errors,touched,handleBlur,handleSubmit,handleChange})=>(
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label style={{color:"white"}}>Email address</Form.Label>
        <Form.Control className="textbox" type="email" placeholder="Enter email" name='email' onBlur={handleBlur} onChange={handleChange}/>
        {errors.email && touched.email ? <div style={{color:"red"}}>{errors.email}</div>:null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{color:"white"}}>Password</Form.Label>
        <Form.Control className="textbox" type="password" placeholder="Password" name ='password' onBlur={handleBlur} onChange={handleChange}/>
        {errors.password && touched.password ? <div style={{color:"red"}}>{errors.password}</div>:null}
      </Form.Group>
      <center><Button variant="warning" type="submit">
        Submit
      </Button>
      </center>
    </Form>
)}
</Formik>
</div>
    </>
  
}

export default Login