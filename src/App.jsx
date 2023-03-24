import "./App.scss";
import useAxios from "@/hooks/useAxios";
import Section from "./components/Section";

const App = () => {
	const { data: genres } = useAxios("/api/getGenres", "POST", [
		"data",
		"reference_list",
		"values",
	]);
	return (
		<>
			{genres?.map((genre, ind) => (
				<Section key={`${genre}-${ind}`} genre={genre.value} />
			))}
		</>
	);
};
export default App;
