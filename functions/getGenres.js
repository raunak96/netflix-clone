const sendApiRequest = require("./utils/sendApiRequest");

exports.handler = async event => {
	const body = JSON.parse(event.body);
	const pageState = body.pageState || null;
	const pageSize = body.pageSize || 4;

	const query = `query getAllGenre {
        reference_list (value: {label:"genre"},options:{pageSize: ${parseInt(
			pageSize
		)} ,pageState:${JSON.stringify(pageState)}}) {
            values {
                value
            }
            pageState
        }
    }`;
	return await sendApiRequest(query);
};
