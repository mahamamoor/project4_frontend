import {useState} from 'react'

const Edit = (props) => {
  let emptyItem = {title:'', description:'', image:'', price: 0}
  const [item, setItem] = useState({...props.item})

  const handleChange = (event) => {
    setItem({...item, [event.target.name]: event.target.value})
  }

  const handleSubmit =(event) => {
    event.preventDefault()
    props.handleUpdate(item)
  }

  return(
    <>
      <details>
        <summary>Edit Product</summary>
        <form onSubmit={handleSubmit}>
          <label>Title: </label>
          <input type="text" name="title" onChange={handleChange}/>
          <br />
          <br />
          <label>Description: </label>
          <input type="text" name="description" onChange={handleChange}/>
          <br />
          <br />
          <label>Image: </label>
          <input type="text" name="image" onChange={handleChange}/>
          <br />
          <br />
          <label>Price: </label>
          <input type="number" name="price" onChange={handleChange}/>
          <input type="submit"/>
        </form>
      </details>
    </>
  )
}

export default Edit
