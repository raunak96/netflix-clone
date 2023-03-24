import { sendApiRequest } from "./utils/sendApiRequest";

export const handler = async event => {
	const genre = JSON.parse(event.body).genre;
	const query = `
        query {
            movies_by_genre (value: { genre: ${JSON.stringify(
				genre
			)}},orderBy: [year_DESC],) {
                values {
                    year,
                    title,
                    duration,
                    synopsis,
                    thumbnail
                }
            }
        }
    `;
	return await sendApiRequest(query);
};
