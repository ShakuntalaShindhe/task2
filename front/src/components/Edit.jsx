import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const Edit = () => {
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[description,setDescription]=useState('')

  const navigate=useNavigate()
  const{id}=useParams()

  useEffect(()=>{
   const fetchData=async()=>{
      try{
        const resp=await axios.get(`https://task2-gdg2.onrender.com/api/products/${id}`)
        const{name,price,description}=resp.data;
         setName(name),
         setPrice(price),
         setDescription(description)

      }catch(err){
        console.log(("error in fetching the data",err))
      }
    }
    fetchData()
  },[id])

 const handleSubmit=async(e)=>{
  e.preventDefault()
  try{
    await axios.put(`https://task2-gdg2.onrender.com/api/products/${id}`,{name,price,description,category});
    navigate('/')
  }catch(error){
    console.log("Error in Editing the books",error)
  }
 }

  return (
    <div className='EditItems'>
      <h4>Edit Products</h4>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} />
      </div>
     <button type='submit'>Add Back</button>
     </form>
    </div>
  )
}

export default Edit
