import { useEffect, useRef } from "react";

/**
 *
 * @param {*} currentValue
 * @param {*} initialValue
 * @returns value of previous state
 */
const UsePrevious = (currentValue, initialValue = undefined) => {
	const current = useRef(initialValue);
	const previous = useRef(initialValue);

	useEffect(() => {
		previous.current = current.current;
		current.current = currentValue;
	}, [currentValue]);

	return previous.current;
};
export default UsePrevious;
