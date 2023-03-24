import { sendApiRequest } from "./utils/sendApiRequest";

export const handler = async event => {
	const query = `query getAllGenre {
        reference_list (value: {label:"genre"}) {
            values {
                value
            }
        }
    }`;
	return await sendApiRequest(query);
};
