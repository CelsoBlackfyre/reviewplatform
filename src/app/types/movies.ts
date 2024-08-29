export interface Movies {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    popularity: string;
    tagline: string;
    runtime: number;
    trailerUrl: string;
}

export interface Series {
    id: number;
    original_name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    popularity: string;
    trailerUrl: string;
}