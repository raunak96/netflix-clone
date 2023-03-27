import { number, shape, string } from "prop-types";

/**
 * @param {{movie:{year:number,title:string,duration:number,synopsis:string,thumbnail:string}}} props
 */
const Card = ({ movie }) => {
	const { duration, title, synopsis, thumbnail, year } = movie;
	return (
		<div className="card">
			<h4>{title}</h4>
			<h4>{duration}</h4>
			<video className="video">
				<source src={thumbnail} type="video/mp4" />
			</video>
		</div>
	);
};
Card.propTypes = {
	movie: shape({
		year: number,
		title: string,
		duration: number,
		synopsis: string,
		thumbnail: string,
	}).isRequired,
};
export default Card;
