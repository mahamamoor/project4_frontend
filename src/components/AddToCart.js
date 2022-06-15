import {useState} from 'react'

const AddToCart = (props) => {
  let itemToAdd = {...props.item, quantity:1}
  const [addedItem, setAddedItem] = useState(itemToAdd)

  return (
    <>
      <button onClick={(event)=> {props.handleAddToCart(addedItem)}} value={props.item}>
      Add to Cart
      </button>
    </>
  )
}

export default AddToCart
