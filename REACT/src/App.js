import './theme/App.css';
import { Switch, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFoundPage";
import { MoviesPage } from "./pages/MoviesPage";
import { MovieDetails } from "./pages/MovieDetailsPage"
import { MainMoviesPage } from "./pages/MainMoviesPage"
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function App() {
  return (
    <>
    <header>
            <nav className="navigation">
            <Link to="/">
                <Stack className="nav-button" spacing={2} direction="row">
                    <Button variant="contained">Home page</Button>
                </Stack>
            </Link>
            <Link to="/movies">
                <Stack className="nav-button" spacing={2} direction="row">
                    <Button variant="contained">To list of popular films</Button>
                </Stack>
            </Link>
            </nav>
    </header> 
    <Switch>
        <Route exact path="/" component={MainMoviesPage}/>
        <Route exact path="/movies" component={MoviesPage}/>
        <Route exact path="/movies/movie:id" component={MovieDetails}/>
        <Route component={NotFound} />
    </Switch>
    <footer>&copy; October 2021</footer> 
    </>
  )
}

export default App;