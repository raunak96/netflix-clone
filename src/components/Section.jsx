import useAxios from "@/hooks/useAxios";
import { string } from "prop-types";
import Card from "./Card";

/**
 * @param {{genre:string}} props
 */
const Section = ({ genre }) => {
	const {
		data,
		isLoading,
		error,
		trigger: getMovies,
	} = useAxios(
		"/api/getMovies",
		"POST",
		{ genre },
		{ responsePath: ["data", "movies_by_genre"] }
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error {JSON.stringify(error)}</div>;

	const { values: movies, pageState: nextPageState } = data;

	return (
		<>
			<div>{genre}</div>
			{movies && movies.length > 0 && (
				<div className="movie-section">
					{movies.map((movie, index) => (
						<Card key={`${movie.title}-${index}`} movie={movie} />
					))}
					{nextPageState && (
						<button
							className="more-button"
							onClick={() => {
								getMovies({
									payloadBody: { pageState: nextPageState },
								});
							}}></button>
					)}
				</div>
			)}
		</>
	);
};

Section.propTypes = {
	genre: string.isRequired,
};
export default Section;
