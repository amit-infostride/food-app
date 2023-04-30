import React, { useReducer } from 'react'
import CartContext from './cart-context';



// inital state 
const defaultCartState = {
  items: [],
  totalAmount: 0
}

// reducer function
const cartReducer = (state, action) => {
  // check action type
  if (action.type === 'ADD') {

    //old total amount in old state snapshot 
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

    // check if item is already part of the cart return the index of the item if it exists
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
   //   existingCartItemIndex is the index of the existing cart item in the state.items array
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems;

    // item was already a part of the cart item array
    if (existingCartItem) 
              {

            const updatedItem = {
              ...existingCartItem,
              // if sushi was already in cart anad if we want to add 2 more sushi then only amount will be updated 
                                            // amount was added by action
              amount: existingCartItem.amount + action.item.amount 
            }

          // new array with copy the exisiting items .ie(copy the old objects)
          updatedItems = [...state.items]
          // pick the old item that was identified in cart item array and overrite with updatedItem
          updatedItems[existingCartItemIndex] = updatedItem
              } 
    
    // item is added in first time in cart
        else {
          //  items in current state snapshot
          // item is added in first time in cart
          updatedItems = state.items.concat(action.item)
              }

    // returing new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };

  }



  // remove item from cart i.e -(minus) sign
  if (action.type === 'REMOVE') 
                {
          const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
            );
            const existingItem = state.items[existingCartItemIndex]
            const updatedTotalAmount = state.totalAmount - existingItem.price
            let updatedItems;
            // it means last item of that type i.e eg  sushi is left only 1 in cart then completely remove sushi item from cart 
            if(existingItem.amount === 1){
              updatedItems = state.items.filter(item=> item.id!==action.id)
            }
            // if amount is greater than 1 then else case
            else{
              const updatedItem ={...existingItem, amount: existingItem.amount - 1 };
              // copy of new array with old items
                  updatedItems =  [...state.items];
                // overrite the one item which was was at fiter index   // ovwerite the old array with the item of updated amount
               
                  updatedItems[existingCartItemIndex]=updatedItem
            }
              // new state object
              return {
                items:updatedItems,
                totalAmount:updatedTotalAmount
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
