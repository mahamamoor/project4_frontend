import {useState} from 'react'
import Button from 'react-bootstrap/esm/Button'
const AddToCart = (props) => {
  let itemToAdd = {...props.item, quantity:1}
  const [addedItem, setAddedItem] = useState(itemToAdd)

  return (
    <>
      <Button variant="outline-dark"  onClick={(event)=> {props.handleAddToCart(addedItem)}} value={props.item}>
      Add to Cart
      </Button>
    </>
  )
}

export default AddToCart
