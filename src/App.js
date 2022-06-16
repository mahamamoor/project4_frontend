// dependencies
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
import AddToCart from './components/AddToCart.js'

const App = () => {
  let [item, setItem] = useState([])
  let [cart, setCart] = useState([])
  let [view, setView] = useState('shop')
  let [query, setQuery] = useState("")

  // API switch between local and heroku for SHOP
  // let api_path = 'https://etsyish-shop.herokuapp.com/api/shop'
  let api_path = 'http://localhost:8000/api/shop'

  // API switch between local and heroku for CART
  // let cart_api_path = 'https://etsyish-shop.herokuapp.com/api/cart'
  let cart_api_path = 'http://localhost:8000/api/cart'

  const shopView = () => {
    setView('shop')
  }

  const cartView = () => {
    setView('cart')
  }

  const getItem = () => {
    axios
    .get(api_path)
    .then(
      (response) => setItem(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

  const getCart = () => {
    axios.get(cart_api_path)
    .then(
      (response) => setCart(response.data),
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
      .delete(api_path + '/' + event.target.value)
      .then((response) => {
        getItem()
      })
  }

  const handleCartDelete = (event, deletedCartProduct) => {
    axios
      .delete(cart_api_path + '/' + event.target.value)
      .then((response) => {
        getCart()
      })
  }

  const deleteFullCart = () => {
    cart.map((deleteItem) => {
      axios
        .delete(cart_api_path + '/' + deleteItem.id)
        .then((response) => {
          getCart()
        })
    })
  }

  const handleAddToCart = (addedItem) => {
    axios.post(cart_api_path, addedItem)
    .then((response) => {
      getCart(response.data)
    })
  }

  useEffect(() => {
    getItem()
    getCart()
  }, [])

  return (
    <>
      <img src="https://i.ibb.co/ZKBzN4C/etsy-ish-main-logo.png" alt="etsy-ish-main-logo" width="300px"/>
      { view == 'shop' ?
      <>
        <div className="search-bar-div">
          <input className="search-bar" placeholder="Search for Item" onChange={event => setQuery(event.target.value)}/>
        </div>
        <button onClick={cartView}>View Cart</button>
      <Add handleCreate={handleCreate}/>
        {item.filter(item => {
          if (query === '') {
            return item
          } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
            return item
          }
        }).map((item) => {
          return (
            <div className="item" key={item.id}>
              <h4>Title: {item.title}</h4>
              <h5>Description: {item.description}</h5>
              <h5>Image: {item.image}</h5>
              <h5>Price: {item.price}</h5>
              <Edit handleUpdate={handleUpdate} item={item}/>
              <button onClick={(event)=> {handleDelete(event, item)}} value={item.id}>
              X
              </button>
              <AddToCart handleAddToCart={handleAddToCart} item={item}/>
            </div>
          )
        })}
        </>
        : null}

      {view == 'cart' ?
        <>
        <h1>Your Cart:</h1>
      <button onClick={shopView}>View Shop</button>
        {cart.map((cartItem) => {
          return (
            <div className="cart-item" key={cartItem.id}>
              <h4>{cartItem.title}, ${cartItem.price}.00, quantity: {cartItem.quantity}</h4>
              <button onClick={(event)=> {handleCartDelete(event, cartItem)}} value={cartItem.id}>X
              </button>
            </div>
          )
        })}
        <h3>Number of items: {cart.reduce((prevValue, currentValue) => {return prevValue + currentValue.quantity}, 0)}</h3>
        <h1>Total: ${cart.reduce((prevValue, currentValue) => {return prevValue + currentValue.price}, 0)}</h1>
        <button onClick={deleteFullCart}>Delete Cart</button>
        </>
        : null}
    </>
  )
}

export default App;
