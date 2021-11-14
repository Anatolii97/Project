import Card from '@mui/material/Card';
import { useHistory } from 'react-router-dom';
import "./index.css";
import CircularProgress from '@mui/material/CircularProgress';

export const MovieItem = ({title, id, vote_average, poster_path, release_date}) => {
    
    const vote = vote_average * 10;
    const date = release_date;

    const history = useHistory();

    const onPush = () => {
        history.push({
            pathname: `/movies/movie${id}`,
            search: '?categories=top'
          })
    }

    return <li className="movies-list-item" onClick={onPush}>
        <Card>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                    alt={title}
                    width="100%"
                    />
             <CircularProgress className="progress" variant="determinate" value={vote} />
            <span className="progress-value">{vote} % </span>
            <h3 className="card-text">{title}</h3>
            <p className="date">Date:{date}</p>
            </div>
        </Card>
    </li>  
}