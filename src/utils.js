/**
 * @param {object} obj
 * @param {string[]} path
 */
export const getObjInPath = (obj, path) => {
	for (let key of path) obj = obj?.[key];
	return obj;
};

export const GENRE_LIMIT = 5;
