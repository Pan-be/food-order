import { useContext, useState } from "react"

import Modal from "../UI/Modal"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

import classes from "./Cart.module.css"

const Cart = (props) => {
	const [ordered, setOrdered] = useState(null)

	const cartCtx = useContext(CartContext)

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

	const hasItems = cartCtx.items.length > 0

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id)
	}
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 })
	}

	const orderHandler = () => {
		setOrdered(1)
	}

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	)

	const submitOrderHandler = (userData) => {
		fetch("https://tasks-menager-default-rtdb.firebaseio.com/orders.json", {
			method: "POST",
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
			}),
		})
	}

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	)

	return (
		<Modal onHideModal={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount: </span>
				<span>{totalAmount}</span>
			</div>
			{ordered && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!ordered && modalActions}
		</Modal>
	)
}

export default Cart
