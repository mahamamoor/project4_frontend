import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

const Add = (props) => {
  let emptyProduct = {title: '', description:'', image: '', price: ''}
  const [product, setProduct] = useState(emptyProduct)

  const handleChange =(event) => {
    setProduct({...product, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(product)
  }

  return(
    <>
    <div className='add'>
      <h2 id='addTitle'>Want to add something to this amazing site?</h2>
      <form onSubmit ={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={product.title} onChange={handleChange}/>
        <br/>
        <label htmlFor="description">Description: </label>
        <input type="text" name="description" value={product.description} onChange={handleChange}/>
        <br/>
        <label htmlFor="image">Image: </label>
        <input type="text" name="image" value={product.image} onChange={handleChange}/>
        <br/>
        <label htmlFor="price">Price: </label>
        <input type="number" name="price" value={product.price} onChange={handleChange}/>
        <br/>
        <Button variant="outline-dark" type="submit">submit</Button>
      </form>
      </div>
    </>
  )
}

export default Add
