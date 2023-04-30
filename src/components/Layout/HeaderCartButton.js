import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';


const   HeaderCartButton = (props) => {
     const [btnIsHighlighted, setBtnIsHighlighted]= useState(false)

          const ctx=  useContext(CartContext);
                                    // reduce method allows you to transfrom of array of data into single value or number in this case 
          const numberOfCartItems = ctx.items.reduce((currNum, item )=>{
                    return currNum + item.amount;
          },0);

          const{items}= ctx;
 
        const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

        // for btn badge bump so that i will highlight when add button is clicked
        useEffect(()=>{
            if(items.length === 0){
                return;
            }
            setBtnIsHighlighted(true);
            const timer =setTimeout(()=>{
                setBtnIsHighlighted(false)
            },300);

            // cleann up function so that timer is clear out 
            //to clean up these side effects and prevent memory leaks.
            return ()=>{
                clearTimeout(timer);
            }
        },[items])
 
    return (
        <button className={btnClasses} onClick={props.onClick2}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton