import styles from "./Checkout.module.css"

const Checkout = (props) => {
	return (
		<form>
			<div className={styles.control}>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name'></input>
			</div>
			<div className={styles.control}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street'></input>
			</div>
			<div className={styles.control}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='name'></input>
			</div>
			<div className={styles.control}>
				<label htmlFor='city'>City</label>
				<input type='text' id='name'></input>
			</div>
			<button type='button' onClick={props.onClose}>
				Cancel
			</button>
			<button type='submit'>Confirm</button>
		</form>
	)
}

export default Checkout
