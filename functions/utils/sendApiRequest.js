import axios, { AxiosError } from "axios";

const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

/**
 *
 * @param {string} query graphql query
 */
export const sendApiRequest = async query => {
	try {
		const { data } = await axios.post(
			url,
			{ query },
			{
				headers: {
					"Content-Type": "application/json",
					"x-cassandra-token": process.env.ASTRA_DB_TOKEN,
				},
			}
		);
		if (data.errors)
			throw new AxiosError(
				data.errors?.[0]?.message || "Invalid Format",
				"Forbidden",
				{},
				{},
				{
					status: 403,
					data: data.errors?.[0]?.message || "Invalid Format",
				}
			);
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (e) {
		console.error(e);
		return {
			statusCode: e.response?.status || 500,
			body: JSON.stringify({
				error:
					e.response?.data ||
					e.request ||
					e.message ||
					"Internal Server Error",
			}),
		};
	}
};
