import { getObjInPath } from "@/utils";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

/**
 *
 * @param {string} url
 * @param {string} method
 * @param {*} body
 * @param {{responsePath:string[],options:object,dependencies:import("react").DependencyList}}
 * @param {{onSuccess: (data)=>void}}
 * @returns {{isLoading: boolean,error:Object,data:any,trigger:({payloadBody,payloadOptions})=>{}}}
 */
const useAxios = (
	url,
	method = "GET",
	body = {},
	{ responsePath = [], options = {}, dependencies = [] } = {},
	{ onSuccess } = {}
) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const memoizedFetch = useCallback(
		async ({ payloadBody = {}, payloadOptions = {} } = {}) => {
			try {
				setIsLoading(true);
				setError(undefined);
				setValue(undefined);

				const { data } = await axios(url, {
					method,
					data: { ...body, ...payloadBody },
					...options,
					...payloadOptions,
				});
				setValue(getObjInPath(data, responsePath));
				onSuccess && onSuccess(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[url, method, ...dependencies]
	);

	useEffect(() => {
		memoizedFetch();
	}, [memoizedFetch]);

	return { isLoading, error, data: value, trigger: memoizedFetch };
};

export default useAxios;
