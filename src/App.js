import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'

const App = () => {
  let [item, setItem] = useState([])

  let api_path = 'https://etsyish-shop.herokuapp.com/api/shop'
  // let api_path = 'http://localhost:8000/api/shop'

  const getItem = () => {
    axios
    .get(api_path)
    .then(
      (response) => setItem(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

  const handleCreate = (addProduct) => {
    axios
    .post(api_path, addProduct)
    .then((response) => {
      console.log(response)
      getItem()
    })
  }

  const handleUpdate = (editProduct) => {
    console.log(editProduct)
    axios
      .put(api_path + editProduct.id, editProduct)
      .then((response) => {
        getItem()
      })
  }

  const handleDelete = (event, deletedProduct) => {
    axios
      .delete(api_path + event.target.value)
      .then((response) => {
        getItem()
      })
  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <>
      <h1>Etsy-ish</h1>
      <Add handleCreate={handleCreate}/>
        {item.map((item) => {
          return(
            <div className="item" key={item.id}>
              <h4>Title: {item.title}</h4>
              <h5>Description: {item.description}</h5>
              <h5>Image: {item.image}</h5>
              <h5>Price: {item.price}</h5>
              <Edit handleUpdate={handleUpdate} item={item}/>
              <button onClick={(event)=> {handleDelete(event, item)}} value={item.id}>
              X
              </button>
            </div>
          )
        })}
    </>
  )
}

export default App;
