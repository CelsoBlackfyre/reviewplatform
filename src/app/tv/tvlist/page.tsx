"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Seriescard from "../tvcard";
import ReactLoading from "react-loading";
import { Series } from "@/app/types/series";
import SearchBar from "@/app/components/searchbar";
import ButtonPage from "@/app/components/buttonpage";

const SeriesList = () => {
	const [series, setSeries] = useState<Series[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [recommendations, setRecommendations] = useState<Series[]>([]);

	const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const fetchSeries = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/discover/tv`, {
				params: {
					page: currentPage,
					api_key: API_KEY,
					sort_by: "vote_count.desc",
				},
			});
			setTotalPages(response.data.total_pages);
			return response.data.results;
		} catch (error) {
			throw error;
		}
	};

	const fetchSerieDetails = async (tvId: number) => {
		try {
			const [tvsResponse, videosResponse] = await Promise.all([
				axios.get(`${BASE_URL}/tv/${tvId}`, {
					params: { api_key: API_KEY },
				}),
				axios.get(`${BASE_URL}/tv/${tvId}/videos`, {
					params: { api_key: API_KEY },
				}),
			]);

			const tvsData = tvsResponse.data;
			const videoData = videosResponse.data.results;
			const trailer = videoData.find(
				(video: any) => video.type === "Trailer" && video.site === "YouTube"
			);

			if (trailer) {
				tvsData.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
			}

			return tvsData;
		} catch (error) {
			throw error;
		}
	};

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

	const fetchAllSeriesDetails = async () => {
		try {
			const tvsList = await fetchSeries();
			const tvsDetailsPromises = tvsList.map((tv: any) =>
				fetchSerieDetails(tv.id)
			);
			const allSeriesDetails = await Promise.all(tvsDetailsPromises);
			setSeries(allSeriesDetails.filter((detail: any) => detail !== null));
		} catch (error) {
			console.error("Error fetching series details:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const searchSeries = async (query: string) => {
		if (searchQuery.trim() === "") {
			fetchAllSeriesDetails();
			return;
		}

		try {
			const response = await axios.get(`${BASE_URL}/search/tv`, {
				params: {
					api_key: API_KEY,
					query: searchQuery,
					page: currentPage,
				},
			});
			const { results, total_pages } = response.data;
			if (results.length > 0) {
				setSeries(results);
				setTotalPages(total_pages);
			} else {
				setSeries([]);
				setTotalPages(0);
			}
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		setIsLoading(true);
		if (searchQuery.trim() === "") {
			fetchAllSeriesDetails();
		} else {
			searchSeries(searchQuery);
		}
	}, [currentPage, searchQuery]);

	useEffect(() => {
		if (searchQuery.trim() !== "") {
			setCurrentPage(1);
		}
	}, [searchQuery]);

	useEffect(() => {
		setIsLoading(false);
	}, [fetchAllSeriesDetails]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ReactLoading type="spin" color="#ffc107" height={50} width={50} />
			</div>
		);
	}

	const handleSearch = (query: string) => {
		setSearchQuery(query.toLowerCase());
		// setCurrentPage(1);
	};

	const filteredSeries = series.filter((tv) =>
		tv.original_name.toLowerCase().includes(searchQuery)
	);

	// if (error) {
	// 	return <div>Error: {error.message}</div>;
	// }

	return (
		<div>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-amber-400 text-3xl text-center mt-12 mb-12">
					Series
				</h1>
				<SearchBar handleSearch={handleSearch} />
				{filteredSeries.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{filteredSeries.map(
							(tv) => tv && <Seriescard key={tv.id} tv={tv} />
						)}
					</div>
				)}
				{/* {series.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{series.map((tv) => tv && <Seriescard key={tv.id} tv={tv} />)}
					</div>
				)} */}
			</div>
			<div className="items-center justify-center flex mb-12">
				<ButtonPage
					currentPage={currentPage}
					totalPages={totalPages}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default SeriesList;
