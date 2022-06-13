import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'

const App = () => {
  let [item, setItem] = useState([])

  const getItem = () => {
    axios
    .get('http://localhost:8000/api/shop')
    .then(
      (response) => setItem(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

  const handleCreate = (addProduct) => {
    axios
    .post('http://localhost:8000/api/shop', addProduct)
    .then((response) => {
      console.log(response)
      getItem()
    })
  }

  const handleUpdate = (editProduct) => {
    console.log(editProduct)
    axios
      .put('http://localhost:8000/api/shop/' + editProduct.id, editProduct)
      .then((response) => {
        getItem()
      })
  }

  const handleDelete = (event, deletedProduct) => {
    axios
      .delete('http://localhost:8000/api/shop/' + event.target.value)
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
