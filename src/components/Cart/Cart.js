import React, { useContext, useState } from "react"

import Modal from "../UI/Modal"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

import classes from "./Cart.module.css"

const Cart = (props) => {
	const [ordered, setOrdered] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [didSubmit, setdDidSubmit] = useState(false)

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

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true)
		await fetch(
			"https://tasks-menager-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		)
		setIsSubmitting(false)
		setdDidSubmit(true)
		cartCtx.clearCart()
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

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount: </span>
				<span>{totalAmount}</span>
			</div>
			{ordered && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!ordered && modalActions}
		</React.Fragment>
	)

	const isSubmittingModalContent = <p>Sending order data...</p>

	const didSubmitModalContent = (
		<React.Fragment>
			<p>your order has been submitted successfully!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	)

	return (
		<Modal onHideModal={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	)
}

export default Cart
