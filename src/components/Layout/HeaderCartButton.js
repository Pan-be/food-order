import { useContext, useEffect, useState } from "react"

import CartContext from "../../store/cart-context"

import CartIcon from "../Cart/CartIcon"

import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {
	const [btnIgHighlighted, setBtnIgHighlighted] = useState(false)
	const cartCtx = useContext(CartContext)

	const { items } = cartCtx

	const numberOfCartNumbers = items.reduce((currNumber, item) => {
		return currNumber + item.amount
	}, 0)

	const btnClasses = `${classes.button} ${btnIgHighlighted ? classes.bump : ""}`

	useEffect(() => {
		if (items.length === 0) {
			return
		}
		setBtnIgHighlighted(true)
		const timer = setTimeout(() => {
			setBtnIgHighlighted(false)
		}, 300)

		return () => {
			clearTimeout(timer)
		}
	}, [items])

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartNumbers}</span>
		</button>
	)
}

export default HeaderCartButton
