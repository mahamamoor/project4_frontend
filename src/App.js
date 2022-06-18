// dependencies
import React, { useState, useEffect, Component} from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
import AddToCart from './components/AddToCart.js'
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { use } from 'express/lib/router/index.js'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import './App.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown'
import Auth from './components/auth'
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
  

  let auth_api_path = 'http://localhost:8000/api/auth'

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
  }, []); 

  return (
    <>
    <Navbar className='Navbar' sticky='top'>
      <Container>
    <img src="https://i.ibb.co/ZKBzN4C/etsy-ish-main-logo.png" alt="etsy-ish-main-logo" width="200px"/>
          <div className="search-bar-div">
          <input className="search-bar" placeholder="Search for Item" onChange={event => setQuery(event.target.value)}/>
        </div>
        { view == 'shop' ? 
           <Button variant="outline-dark"  onClick={cartView}>View Cart</Button> : null }
          {view == 'cart' ? 
          <Button variant="outline-dark"  onClick={shopView}>View Shop</Button> : null}
        </Container>
      </Navbar>
      <div className='login'>
          <Auth/>
        </div>
      <div className='options'>
        <div>
        <img id='rim' src="https://www.etsy.com/assets/dist/images/giftcards/designs/50/560x332.20201215163345.png" width='100'/>
        <h5>Swimwear</h5>
        </div>
        <div>
        <img id='rim'  src="https://www.etsy.com/assets/dist/images/giftcards/designs/50/560x332.20201215163345.png" width='100'/>
        <h5>Accessories</h5>
        </div>
        <div>
        <img id='rim' src="https://www.etsy.com/assets/dist/images/giftcards/designs/50/560x332.20201215163345.png" width='100'/>
        <h5>Menswear</h5>
        </div>
        <div>
        <img id='rim' src="https://www.etsy.com/assets/dist/images/giftcards/designs/50/560x332.20201215163345.png" width='100'/>
        <h5>Personalized</h5>
        </div>
        <div>
        <img id='rim' src="https://www.etsy.com/assets/dist/images/giftcards/designs/50/560x332.20201215163345.png" width='100'/>
        <h5>Tech Gagets</h5>
        </div>
        <div>
        <img id='rim' src="https://www.etsy.com/assets/dist/images/giftcards/designs/50/560x332.20201215163345.png" width='100'/>
        <h5>Animal Stuff</h5>
        </div>
      </div>
      { view == 'shop' ?
      <>
      <Add handleCreate={handleCreate}/>
        {item.filter(item => {
          if (query === '') {
            return item
          } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
            return item
          }
        }).map((item) => {
          return (
            <div className="items">
              <div className="item" key={item.id}>
                <h4>{item.title}</h4>
                <img src={item.image} width="300" hight="300" />
                <h5>About - {item.description}</h5>
                <h5>Price - {item.price}</h5>
                <h4>✰✰✰✰✰✰✰(everyone)</h4>
                <AddToCart handleAddToCart={handleAddToCart} item={item} />
                <Dropdown className='drop'>
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    More for this Listing
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                  
                      <Edit handleUpdate={handleUpdate} item={item} />
                  
                    <Dropdown.Item>
                      {" "}
                      <Button
                        variant="outline-light"
                        onClick={(event) => {
                          handleDelete(event, item);
                        }}
                        value={item.id}
                      >
                        X
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
       
        </>
        : null}

      {view == 'cart' ?
        <>
        <h1>Your Cart:</h1>
      
        {cart.map((cartItem) => {
          return (
            <div className="cart-item" key={cartItem.id}>
              <h4>{cartItem.title}, ${cartItem.price}.00, quantity: {cartItem.quantity}</h4>
              <Button variant="outline-dark"  onClick={(event)=> {handleCartDelete(event, cartItem)}} value={cartItem.id}>X
              </Button>
            </div>
          )
        })}
        <h3>Number of items: {cart.reduce((prevValue, currentValue) => {return prevValue + currentValue.quantity}, 0)}</h3>
        <h1>Total: ${cart.reduce((prevValue, currentValue) => {return prevValue + currentValue.price}, 0)}</h1>
        <Button variant="outline-dark"  onClick={deleteFullCart}>Delete Cart</Button>
        </>
        : null}
        <footer>
          <h4>Etsy-ish was created by - Tim Minker, Sage Kolpin, and Maha Mamoor</h4>
          <a id='logo' href='https://github.com/timeminker/project4_frontend/tree/master'><img src='https://www.kindpng.com/picc/m/128-1280192_github-logo-png-github-png-transparent-png.png' width='40'/></a>
        </footer>
    </>
  )
      }
      
export default App;
