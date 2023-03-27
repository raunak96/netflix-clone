const sendApiRequest = require("./utils/sendApiRequest");

exports.handler = async event => {
	const body = JSON.parse(event.body);
	const genre = body.genre;
	const pageState = body.pageState || null;
	const pageSize = body.pageSize || 6;

	const query = `
        query {
            movies_by_genre (value: { genre: ${JSON.stringify(
				genre
			)}},orderBy: [year_DESC],options:{pageSize: ${parseInt(
		pageSize
	)} ,pageState:${JSON.stringify(pageState)}}) {
                values {
                    year,
                    title,
                    duration,
                    synopsis,
                    thumbnail
                }
                pageState
            }
        }
    `;
	return await sendApiRequest(query);
};
