import { useEffect, useState } from "react";
import { getTrending } from "../../api";
import { MovieItem } from "../MovieItem/MovieItem";
import "./index.css";
import { SearchMovie } from "../SearchBar/SearchBar"

export const MovieList = () => {
    const [response, setResponse] = useState([])
    useEffect (() => {
        getTrending().then((data) => setResponse(data))
    }, [])

    // console.log("response", response)

    return (
        <div className="content">
            <div className="search-list">
              <SearchMovie/>
            </div>
                <div className="list-movies-block">
                    <ul className="list-movies">
                        { response && response.map(({title, id, vote_average, poster_path, release_date}) => 
                        <MovieItem title={title} release_date={release_date} 
                        poster_path={poster_path} vote_average={vote_average} key={id} id = {id}/> )}
                    </ul>
                </div>
            </div>
    )
}