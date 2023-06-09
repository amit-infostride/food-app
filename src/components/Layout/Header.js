import React from 'react'
import mealsImage from  '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>Panda Meals</h1>
                <HeaderCartButton onClick2={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt= 'A Table full of delicious food!' />
            </div>
        </>
    )
}

export default Header