import "./App.scss";
import useAxios from "@/hooks/useAxios";
import Section from "@/components/Section";
import { useEffect, useRef, useState } from "react";
import { GENRE_LIMIT } from "@/utils";
import UseOnScreen from "./hooks/useOnScreen";

const App = () => {
	const [genres, setGenres] = useState([]);
	const [pageState, setPageState] = useState(null);
	const { isLoading, data } = useAxios(
		"/api/getGenres",
		"POST",
		{ pageSize: GENRE_LIMIT, pageState },
		{ dependencies: [pageState], responsePath: ["data", "reference_list"] },
		{
			onSuccess: data =>
				setGenres(prevGenres => [
					...prevGenres,
					...data.data.reference_list.values,
				]),
		}
	);
	const infiniteScrollRef = useRef();
	const isVisible = UseOnScreen(infiniteScrollRef, isLoading);

	useEffect(() => {
		if (isVisible && data?.pageState) setPageState(data.pageState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	return (
		<>
			{genres.length > 0 && (
				<>
					{genres.map((genre, ind) => (
						<Section
							key={`${genre.value}-${ind}`}
							genre={genre.value}
						/>
					))}
					{!isLoading && (
						<div className="page-end" ref={infiniteScrollRef} />
					)}
				</>
			)}
			{isLoading && <div>Loading...</div>}
		</>
	);
};
export default App;
