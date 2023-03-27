import { useEffect, useState } from "react";

/**
 *
 * @param {React.MutableRefObject} ref
 * @param {boolean} isLoading
 * @returns {boolean} html element {ref} is visible or not
 */
const UseOnScreen = (ref, isLoading) => {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		if (!ref.current || isLoading) return;
		const observer = new IntersectionObserver(([entry]) => {
			setIsVisible(entry.isIntersecting);
		});
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref, isLoading]);

	return isVisible;
};
export default UseOnScreen;
