import React,{useEffect,useState} from 'react'
import {Table} from 'react-bootstrap'
import {toast} from "react-toastify"
import AxiosService from '../utils/ApiService'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import img1 from "../images/img3.avif"

function ProductReport() {
  let [product,setProduct] = useState([])
  let navigate = useNavigate()
  let getProduct = async()=>{
    try {
        let res = await AxiosService.get('/product/getproducts')
        if(res.status===200)
        {
          setProduct(res.data.product)
        }
    } catch (error) {
      toast.error(error)
      
    }
  }

  useEffect(()=>{
    getProduct()
  },[])

  return <>
<img src={img1} alt = "Login Image" className='img1'/>

  <div className='container contPR'>
  <h1 className="PR1" style={{textAlign:"center",color:"black"}}>Product Reports!</h1>
  <table className='table1'>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Product Type</th>
          <th>Product Code</th>
          <th>Product Title</th>
          <th>Cost Per Item</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          product.map((e,i)=>{
            return<tr key={e._id}>
              {console.log(e)}
              <td>{i+1}</td>
              <td>{e.producttype}</td>
              <td>{e.productcode}</td>
              <td>{e.producttitle}</td>
              <td>{e.costperitem}</td>
      
              <td>{<i className="fa-solid fa-pencil" style={{color:"red"}} onClick={()=>{navigate(`/editproduct/${e._id}`)}}></i>}</td>
              
            </tr>
          })
        }
        
      </tbody>
    </table>
    </div>

  
  </>
}

export default ProductReport