import { number, shape, string } from "prop-types";
import { useRef, useState } from "react";

/**
 * @param {{movie:{year:number,title:string,duration:number,synopsis:string,thumbnail:string}}} props
 */
const Card = ({ movie }) => {
	const [showInfo, setShowInfo] = useState(false);
	const videoRef = useRef();

	const { title, thumbnail } = movie;
	return (
		<div
			className="card"
			onMouseEnter={() => {
				videoRef.current.play();
				setShowInfo(true);
			}}
			onMouseLeave={() => {
				videoRef.current.pause();
				setShowInfo(false);
			}}>
			<video
				className="video"
				loop={showInfo}
				muted={true}
				ref={videoRef}>
				<source src={thumbnail} type="video/mp4" />
			</video>
			{showInfo && (
				<div className="info-box">
					<p>{title}</p>
				</div>
			)}
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
