import { useRef, useState } from "react"
import classes from "./Checkout.module.css"

const isEmpty = (value) => value.trim() === ""
const isFiveChars = (value) => value.trim().length === 5

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	})

	const nameRef = useRef()
	const streetRef = useRef()
	const postalRef = useRef()
	const cityRef = useRef()

	const confirmHandler = (e) => {
		e.preventDefault()

		const enteredName = nameRef.current.value
		const enteredStreet = streetRef.current.value
		const enteredPostalCode = postalRef.current.value
		const enteredCity = cityRef.current.value

		const enteredNameIsValid = !isEmpty(enteredName)
		const enteredStreetIsValid = !isEmpty(enteredStreet)
		const enteredCityIsValid = !isEmpty(enteredCity)
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)

		setFormInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postal: enteredPostalCodeIsValid,
			city: enteredCityIsValid,
		})

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalCodeIsValid &&
			enteredCityIsValid

		if (!formIsValid) {
			return
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postal: enteredPostalCode,
		})
	}

	const nameControleClasses = `${classes.control} ${
		formInputValidity.name ? "" : classes.invalid
	}`
	const streetControleClasses = `${classes.control} ${
		formInputValidity.street ? "" : classes.invalid
	}`
	const postalControleClasses = `${classes.control} ${
		formInputValidity.postal ? "" : classes.invalid
	}`
	const cityControleClasses = `${classes.control} ${
		formInputValidity.city ? "" : classes.invalid
	}`

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControleClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameRef} />
				{!formInputValidity.name && <p>Please enter the valid name.</p>}
			</div>
			<div className={streetControleClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetRef} />
				{!formInputValidity.street && <p>Please enter the valid street.</p>}
			</div>
			<div className={postalControleClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalRef} />
				{!formInputValidity.postal && (
					<p>Please enter the valid postal code.</p>
				)}
			</div>
			<div className={cityControleClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityRef} />
				{!formInputValidity.city && <p>Please enter the valid city.</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	)
}

export default Checkout
