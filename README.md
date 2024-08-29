# TMDB API Project
=====================

## Overview
-----------

This project is a movie and TV show review platform built with Next.js, Tailwind CSS, and TypeScript. It fetches data from the TMDB API to display information about various movies and TV shows.

### Features
------------

*   **Browse and Search**: Browse and search for movies and TV shows.
*   **Detailed Information**: View detailed information, including ratings, overviews, and genres.
*   **Responsive Design**: Responsive design with Tailwind CSS for a seamless user experience across devices.
*   **Star Rating System**: Star rating system using react-icons for user-friendly ratings.

### Todo
-----

*   **Review Page**: Implement a review page for user input to collect feedback and ratings.

### Fetching Data
-----------------

#### Movies
---------

The movie data is fetched from the TMDB API's `/movie` endpoint. It includes details like:

*   **Title**: The title of the movie.
*   **Overview**: A brief summary of the movie.
*   **Release Date**: The release date of the movie.
*   **Rating**: The user rating of the movie.
*   **And more**: Additional details like genres, runtime, and production companies.

#### TV Shows
---------

Similarly, TV show data is fetched from the `/tv` endpoint. You can retrieve information like:

*   **Title**: The title of the TV show.
*   **Seasons**: The number of seasons in the TV show.
*   **Episodes**: The number of episodes in each season.
*   **User Ratings**: The user ratings of the TV show.

### Styling
---------

The project is styled using Tailwind CSS, which provides a responsive design that adapts to different screen sizes. All components are designed to be mobile-friendly and accessible.

### TypeScript
-------------

TypeScript is used for type safety, ensuring that components receive the correct props and making the codebase more maintainable. This helps catch errors early and improves code quality.
