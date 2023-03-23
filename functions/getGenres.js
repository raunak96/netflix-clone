import axios from "axios";

export const handler = async event => {
	const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

	const query = `query getAllGenre {
        reference_list (value: {label:"genre"}) {
            values {
                value
            }
        }
    }`;

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
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (e) {
		console.error(e);
		return {
			statusCode: 500,
			body: JSON.stringify(e),
		};
	}
};
