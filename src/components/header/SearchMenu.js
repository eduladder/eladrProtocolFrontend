import React, { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

export default function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState('')
  const [id, setId] = useState('')

  const navigate = useNavigate()

  const customConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    },
    mode: 'cors'
  }

  async function handleSearch() {
    
    
    const response = await  axios.post(`http://localhost:8000/search/${searchTerm}`, customConfig)
    const {data} = response
    if (data.length !== 0) {
      console.log(data)
      setId(data[0].id)
    }
    else {
      alert('Not Found!!')
      setId('')
    }
  }
  return (
    <div className="search">
      <input type="text" placeholder="video hash" onChange={(e) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
      }} />
      <button className="nav_btn"  onClick={
        () => {
          handleSearch().then(() => {
            navigate(`/${id}`)
          })
        }
      }>Search</button>
    </div>
  );

}