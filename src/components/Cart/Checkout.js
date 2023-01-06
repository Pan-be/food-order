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
		const enteredCityIsValid = !isEmpty(enteredPostalCode)
		const enteredPostalCodeIsValid = isFiveChars(enteredCity)

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

		if (formIsValid) {
		}
	}

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={classes.control}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameRef} />
				{!formInputValidity.name && <p>Please enter the valid name.</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityRef} />
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
