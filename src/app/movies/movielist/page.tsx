"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "../moviecard/page";
import { Movies } from "@/app/types/movies";
import ReactLoading from "react-loading";
import ButtonPage from "@/app/components/buttonpage/ButtonPage";
import SearchBar from "@/app/components/searchbar/SearchBar";

function MovieList() {
	const [movies, setMovies] = useState<Movies[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Use NEXT_PUBLIC_ prefix
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Use NEXT_PUBLIC_ prefix

	const fetchMovies = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/discover/movie`, {
				params: {
					page: currentPage,
					api_key: API_KEY,
					sort_by: "popularity.desc",
				},
			});
			setTotalPages(response.data.total_pages);
			return response.data.results; // Return the list of movies
		} catch (error) {
			console.error("Error fetching movies:", error);
			return [];
		}
	};

	const fetchMovieDetails = async (movieId: number) => {
		try {
			const [movieResponse, videosResponse] = await Promise.all([
				axios.get(`${BASE_URL}/movie/${movieId}`, {
					params: { api_key: API_KEY },
				}),
				axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
					params: { api_key: API_KEY },
				}),
			]);

			const movieData = movieResponse.data;
			const videoData = videosResponse.data.results;
			const trailer = videoData.find(
				(video: any) => video.type === "Trailer" && video.site === "YouTube"
			);

			return {
				...movieData,
				trailerUrl: trailer
					? `https://www.youtube.com/watch?v=${trailer.key}`
					: null,
			};
		} catch (error) {
			console.error(`Error fetching details for movie ${movieId}:`, error);
			return null;
		}
	};

	const fetchAllMovieDetails = async () => {
		const moviesList = await fetchMovies();
		const movieDetailsPromises = moviesList.map((movie: any) =>
			fetchMovieDetails(movie.id)
		);

		try {
			const allMovieDetails = await Promise.all(movieDetailsPromises);
			setMovies(allMovieDetails.filter((detail: any) => detail !== null));
		} catch (error) {
			console.error("Error fetching all movie details:", error);
			setMovies([]);
		}
		setIsLoading(false);
	};

	const searchMovies = async (query: string) => {
		if (searchQuery.trim() === "") {
			fetchAllMovieDetails();
			return;
		}
		try {
			const response = await axios.get(`${BASE_URL}/search/movie`, {
				params: {
					api_key: API_KEY,
					query: query,
				},
			});
			const results = response.data.results;
			const total_pages = response.data.total_pages;
			setMovies(results);
			setTotalPages(total_pages);
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		setIsLoading(true);
		if (searchQuery.trim() === "") {
			fetchAllMovieDetails();
		} else {
			searchMovies(searchQuery);
		}
	}, [currentPage, searchQuery]);

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setCurrentPage(1);
		}
	}, [searchQuery]);

	useEffect(() => {
		setIsLoading(false);
	}, [fetchAllMovieDetails]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ReactLoading type="spin" color="#ffc107" height={50} width={50} />
			</div>
		);
	}

	const handleSearch = (query: string) => {
		setSearchQuery(query.toLowerCase());
	};

	const filteredMovies = movies.filter((movie) =>
		movie.title.toLowerCase().includes(searchQuery)
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-amber-400 text-3xl text-center mb-12">Movies</h1>
			<SearchBar handleSearch={handleSearch} />
			{filteredMovies.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{filteredMovies.map((movie) => (
						<Moviecard key={movie.id} movie={movie} />
					))}
				</div>
			)}
			{/* {movies.map((movie) => (
					<Moviecard key={movie.id} movie={movie} />
				))} */}
			<div className="items-center justify-center flex mb-12">
				<ButtonPage
					currentPage={currentPage}
					totalPages={totalPages}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
}

export default MovieList;
