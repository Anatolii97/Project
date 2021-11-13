const apiKey = '2daa4df094e8597359599d81734c77ae';

export const getTrending = () => {
    return fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=2daa4df094e8597359599d81734c77ae`,
    )
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        throw new Error('NOT FOUND');
    })
    .then(data => data.results)
    .catch(err => {
        throw err;
    });
};

export const fetchMoviesDetails = movieId => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    )
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        throw new Error('NOT FOUND');
    })
    .catch(err => {
        throw err;
    });
};