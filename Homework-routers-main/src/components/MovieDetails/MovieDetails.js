import { useEffect, useState } from "react";
import { fetchMoviesDetails } from "../../api";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import "./index.css"
import CircularProgress from '@mui/material/CircularProgress';
import {Comments} from "../Comments/Comments"

export const MovieDetailsContainer = () => {

    const [movie, setMovie] = useState(null);

    const {search} = useLocation();
    const history = useHistory();
    const {params} = useRouteMatch();
    

    const movieId = params.id;

    queryString.parse(search);
    
    useEffect(() => {
        if (movieId){
        fetchMoviesDetails(movieId).then((res) => setMovie(res))
        }
    }, [movieId])

    const onGoBack = () => history.push('/movies');
    const titleJSX = movie && movie.title;
    const vote = movie && (movie.vote_average) * 10;
    const overview = movie && movie.overview;
    const countValue = movie && movie.vote_count;

    console.log(movie)

    return (
        <div className="details">
            <button className="button-back" onClick={onGoBack}>Go back</button>
            <div className="details-block">
                <div className="poster">
                    <img className="poster-img" src={`https://image.tmdb.org/t/p/w300/${movie && movie.poster_path}`} alt=''/>
                </div>
                <div className="description">
                    <h1 className="title">{titleJSX}</h1>
                    <CircularProgress className="progress" variant="determinate" value={vote} />
                    <span className="progress-value">{vote} % </span>
                    <span className="count-value">Count value: {countValue}</span>
                    <h2 className="overview">Overview</h2>
                    <p className="overview-text">{overview}</p>
                </div>
            </div>
            <div className="comment-box"><Comments/></div>
        </div>
    )
}