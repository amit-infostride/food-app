import React from "react";
 
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
});

export default CartContext; 


//  React.createContext({default data})
// then we will manage in  context in some component with useState or useReducer  