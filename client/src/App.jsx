import './App.css';
import { useEffect, useMemo, useState } from "react";
import { createSession, createUser, deleteMovie, getMovie, getMovieById, sendMovies } from "./api/api";
import { MovieList } from "./components/MoviesList/MovieList";
import { AddMovie } from "./components/AddMovie/AddMovie";

export const App = () => {
    const [movies, setMovies] = useState([]) // All Movie FROM SERVER
    const [value, setValue] = useState('') // Value for FILTER
    const [findBuId, setFindBuId] = useState({}) // Info about MOVIE
    const [sortValue, setSortValue] = useState('') // SORT VALUE
    const [filterBy, setFilterBy] = useState('')  // FILTER VALUE

    useEffect(async () => {
        await createUser('http://localhost:8000/api/v1/users')
        await createSession(`http://localhost:8000/api/v1/sessions`)
    },[])

    useEffect(async() => {
        const allMovie = await getMovie()
        const moviesWithActors = await Promise.all(allMovie.map(movie => getMovieById(movie.id)))
        setMovies(moviesWithActors)
    }, [])

    const filerByName = useMemo(() => {
        switch (filterBy) {
            case "BY_ACTORS":
                return movies.filter(movie => {
                    const actorsOnFilm = movie.actors.map(actor => actor.name)
                    if ((actorsOnFilm.join(',').toLowerCase()).includes(value.toLowerCase())) {
                        return movie
                    }
                })

            default:
                return  movies.filter(movie => ((movie.title).toLowerCase().includes(value.toLowerCase())))
        }
    },[value, movies])

    const sortMovieByName = useMemo(() => {
        switch (sortValue) {
            case 'name':
                return [...filerByName].sort((firstItem, secondItem) => {
                    if (firstItem.title.toLowerCase() < secondItem.title.toLowerCase()) {return -1}
                    if (firstItem.title.toLowerCase() > secondItem.title.toLowerCase()) {return 1}
                    return 0
                })
            default:
                return filerByName
        }
    }, [filerByName, sortValue, movies])

    const findMovieById = (movieID) => {
        const findMovie = filerByName.find(movie => movie.id === movieID)
        setFindBuId(findMovie)
    }

    console.log('filter',filerByName)
    console.log('movies',movies)

  return (
    <div className="App">
        <AddMovie
            movies={movies}
            setMovie={setMovies}
            value={value}
            setValue={setValue}
            sortByName={setSortValue}
            setFilterBy={setFilterBy}
        />
        {
            !!sortMovieByName.length &&
           <MovieList
               movies={sortMovieByName}
               deleteMovie={deleteMovie}
               findMovieById={findMovieById}
               findBuId={findBuId}
               setMovie={setMovies}
           />
        }
    </div>
  );
}
