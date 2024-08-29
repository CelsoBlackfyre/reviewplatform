'use client'

import React,{useEffect,useState} from 'react'

function Movies () {
    const [movieList, setMovieList] = useState([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWRjNTJjNzY4MjQ0MDMzZDQwNGVjODBjZjI2YTAxMiIsIm5iZiI6MTcyNDYyMDAyOC4wMTc2MjcsInN1YiI6IjY1ZTUzY2RiZjcwNmRlMDE4NmM5M2ZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FTLc7snT-kdz577JEbmfHWB6xwuw4yQbfJ1R1tIBOzs'
        }
    };

    const getMovies = () => {
        fetch(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=2002',
            options
        )
            .then((response) => response.json())
            .then((data) => {
                setMovieList(data.results); // Save the fetched movies to the state
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movieList.map((movie) => (
                    <li key={movie.id}>
                        {/*<h2>{movie.title}</h2>*/}
                        {/*<p>{movie.overview}</p>*/}
                        <div className="card card-side bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    className="h-[250px]"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt="Movie"/>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{movie.title}</h2>
                                <p>{movie.overview}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">View</button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Movies