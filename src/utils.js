/**
 * @param {object} obj
 * @param {string[]} path
 */
export const getObjInPath = (obj, path) => {
	for (let key of path) obj = obj?.[key];
	return obj;
};

export const GENRE_LIMIT = 5;

export const getRandomGenre = () => {
	const genres = [
		"Action",
		"Anime",
		"Award-Winning",
		"Children & Family",
		"Comedies",
		"Documentaries",
		"Dramas",
		"Fantasy",
		"French",
		"Horror",
		"Independent",
		"Music",
		"Romance",
		"Sci-Fi",
		"Thriller",
	];
	return genres[Math.floor(Math.random() * genres.length)];
};
