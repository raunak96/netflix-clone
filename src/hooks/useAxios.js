import { getObjInPath } from "@/utils";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

/**
 *
 * @param {string} url
 * @param {"GET" || "POST" || "PUT" || "DELETE"} method
 * @param {string[]} responsePath
 * @param {*} options
 * @param {*} body
 * @returns {{isLoading: boolean,error:Object,data:Object}}
 */
const useAxios = (
	url,
	method = "GET",
	responsePath = [],
	body = {},
	options = {}
) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const memoizedFetch = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(undefined);
			setValue(undefined);

			const { data } = await axios(url, {
				method,
				data: body,
				...options,
			});
			setValue(getObjInPath(data, responsePath));
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, method]);

	useEffect(() => {
		memoizedFetch();
	}, [memoizedFetch]);

	return { isLoading, error, data: value };
};

export default useAxios;
