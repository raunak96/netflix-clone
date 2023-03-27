import useAxios from "@/hooks/useAxios";
import { getRandomGenre } from "@/utils";
import { useRef } from "react";

const HeroSection = () => {
	const genre = getRandomGenre();
	const videoRef = useRef();
	const { data: movies } = useAxios(
		"/api/getMovies",
		"POST",
		{ genre },
		{ responsePath: ["data", "movies_by_genre", "values"] },
		{ onSuccess: () => videoRef.current?.play?.() }
	);
	const randomMovie =
		movies?.length > 0
			? movies[Math.floor(Math.random() * movies.length)]
			: null;
	return (
		<>
			{randomMovie && (
				<div className="hero">
					<video
						className="hero-video"
						ref={videoRef}
						muted
						autoPlay={true}
						loop>
						<source src={randomMovie.thumbnail} type="video/mp4" />
					</video>

					<div className="info-section">
						<h3 className="hero-blurb">{randomMovie.synopsis}</h3>
						<div className="button-section">
							<div className="button play">
								<span>
									<i className="fas fa-play"></i>
								</span>
								Play
							</div>
							<div className="button more">
								<span>
									<i className="fas fa-info-circle"></i>
								</span>
								More info
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default HeroSection;
