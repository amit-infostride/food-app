import React, { useContext } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';


const  HeaderCartButton = (props) => {

          const ctx=  useContext(CartContext);
                                    // reduce method allows you to transfrom of array of data into single value or number in this case 
          const numberOfCartItems = ctx.items.reduce((currNum, item )=>{
                    return currNum + item.amount;
          },0);
 
 
    return (
        <button className={classes.button} onClick={props.onClick2}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton