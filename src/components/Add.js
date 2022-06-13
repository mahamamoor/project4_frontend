import React, {useState, useEffect} from 'react'

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
      <form onSubmit ={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={product.title} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="description">Description: </label>
        <input type="text" name="description" value={product.description} onChange={handleChange}/>
        <label htmlFor="image">Image: </label>
        <input type="text" name="image" value={product.image} onChange={handleChange}/>
        <label htmlFor="price">Price: </label>
        <input type="number" name="price" value={product.price} onChange={handleChange}/>
        <input type="submit"/>
      </form>
    </>
  )
}

export default Add
