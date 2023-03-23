import { string } from "prop-types";

/**
 * @param {{genre:string}} props
 */
const Section = ({ genre }) => {
	return <div>{genre}</div>;
};

Section.propTypes = {
	genre: string.isRequired,
};
export default Section;
