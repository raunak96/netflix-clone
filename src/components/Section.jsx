import useAxios from "@/hooks/useAxios";
import { string } from "prop-types";
import Card from "./Card";

/**
 * @param {{genre:string}} props
 */
const Section = ({ genre }) => {
	const { data: movies } = useAxios(
		"/api/getMovies",
		"POST",
		["data", "movies_by_genre", "values"],
		{ genre }
	);

	return (
		<>
			<div>{genre}</div>
			{movies && movies.length > 0 && (
				<div className="movie-section">
					{movies.map((movie, index) => (
						<Card key={`${movie.title}-${index}`} movie={movie} />
					))}
				</div>
			)}
		</>
	);
};

Section.propTypes = {
	genre: string.isRequired,
};
export default Section;
