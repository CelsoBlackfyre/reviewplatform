"use client";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import SeriesList from "@/app/tv/tvlist/page";
import SearchBar from "@/app/components/searchbar";
import Seriescard from "../tvcard";
import { Series } from "@/app/types/series";

function SeriesRecommendations() {
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [recommendations, setRecommendations] = useState<Series[]>([]);
	const [series, setSeries] = useState<Series[]>([]);

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
			// const { results } = response.data;
			setRecommendations(response.data.results);
		} catch (error) {
			throw error;
		}
	};

	const handleSeriesClick = (tvId: number) => {
		fetchRecommendations(tvId);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ReactLoading type="spin" color="#ffc107" height={50} width={50} />
			</div>
		);
	}

	return (
		<div>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-amber-400 text-3xl text-center mt-12 mb-12">
					Series
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{recommendations.map(
						(tv) => tv && <Seriescard key={tv.id} tv={tv} />
					)}
				</div>
			</div>
		</div>
	);
}

export default SeriesRecommendations;
