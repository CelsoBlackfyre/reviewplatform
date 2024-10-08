import React from "react";
import { Movies } from "@/app/types/movies";
import StarRating from "@/app/components/starrating/starRating";
export interface Props {
	movie: Movies;
}
export default function Moviecard(props: Props) {
	const movie = props.movie;
	return (
		<div className="flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
			<div className="w-2 bg-gray-800"></div>
			<div
				className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
				data-movie-id="438631">
				<div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
				<div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info">
					<div className="poster__info align-self-end w-full">
						<div className="h-32"></div>
						<div className="space-y-6 detail_info">
							<div className="flex flex-col space-y-2 inner">
								<a
									className="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700 "
									target="_blank"
									href={movie.trailerUrl}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-10 h-10"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
											clipRule="evenodd"></path>
									</svg>
									<div className="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2">
										Trailer
									</div>
								</a>
								<h3 className="text-2xl font-bold text-white">{movie.title}</h3>
								<div className="mb-0 text-lg text-gray-400">
									{movie.tagline}
								</div>
							</div>
							<div className="flex flex-row justify-between datos">
								<div className="flex flex-col datos_col">
									<div className="popularity">{movie.popularity}</div>
									<div className="text-sm text-gray-400">Popularity:</div>
								</div>
								<div className="flex flex-col datos_col">
									<div className="release">{movie.release_date}</div>
									<div className="text-sm text-gray-400">Release date:</div>
								</div>
								<div className="flex flex-col datos_col">
									<div className="release">{movie.runtime} min</div>
									<div className="text-sm text-gray-400">Runtime:</div>
								</div>
							</div>
							<div className="flex flex-col overview">
								<div className="text-xs text-gray-400 mb-2">Overview:</div>
								<p className="text-xs text-gray-100 mb-6">{movie.overview}</p>
							</div>
						</div>
					</div>
				</div>
				<img
					className="absolute inset-0 transform w-full -translate-y-4"
					src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
					alt={movie.title}
					style={{ filter: "grayscale(0)" }}
				/>
				<div className="poster__footer flex flex-col relative pb-10 z-10">
					<div className="flex justify-center">
						<StarRating rating={movie.vote_average} />
					</div>
					<a
						className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 mt-4"
						href="http://www.google.com/calendar/event?action=TEMPLATE&amp;dates=20210915T010000Z%2F20210915T010000Z&amp;text=Dune%20%2D%20Movie%20Premiere&amp;location=http%3A%2F%2Fmoviedates.info&amp;details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info"
						target="_blank"
						rel="noopener noreferrer">
						<div className="text-sm text-white ml-2">Add to Calendar</div>
					</a>
				</div>
			</div>
		</div>
	);
}
