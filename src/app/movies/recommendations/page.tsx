import React, { useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import SeriesList from "@/app/tv/tvlist/page";

function MovieRecommendations() {
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const fetchRecommendations = async (tvId: number) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/tv/${tvId}/recommendations`,
				{
					params: {
						api_key: API_KEY,
						page: currentPage,
					},
				}
			);
			const { results } = response.data;
			return results;
		} catch (error) {
			throw error;
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ReactLoading type="spin" color="#ffc107" height={50} width={50} />
			</div>
		);
	}

	return <div>MovieRecommendations</div>;
}

export default MovieRecommendations;
