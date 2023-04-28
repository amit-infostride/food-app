import React, { useReducer } from 'react'
import CartContext from './cart-context';



// inital state 
const defaultCartState = {
  items: [],
  totalAmount: 0
}
// reducer function

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState
} 

const CartProvider = (props) => {

  // state snapshot - cartState
  // dispatchCartAction -- a new action          // reducer function , inital state
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item })
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  // cartContext values will be updated over time
  const cartContext = {
    // items: [],
    // totalItems: 0,
    // addItem: addItemToCartHandler,
    // removeItem: removeItemFromCartHandler

    items: cartState.items,
    totalItems: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider


//the goal of CartProvider is to manage the cart-context data and provide 
// that context to  all component that want access to it
// { props.children }   allows to wrap to components so that they can acess the context 

// and we are adding logic for manaaging the context data to this component 
// so that all the components    
