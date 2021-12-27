import React from "react";
import "./AddMovie.css"
import { useState } from "react";

export const AddMovie = ({
 setMovie,
 value,
 setValue,
 sortByName,
 setFilterBy,
 movies
}) => {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [actors, setActors] = useState('')
    const [format, setFormat] = useState('')

    const createMovie = async () =>  {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem('token'));
            myHeaders.append('Content-type', 'application/json');

            const movie = await fetch("http://localhost:8000/api/v1/movies", {
                method: 'POST',
                headers:myHeaders,
                body: JSON.stringify({
                    "title": `${title}`,
                    "year": +`${year}`,
                    "format": `${format}`,
                    "actors": actors.split(', ')
                }),
                redirect: 'follow'
            })
            const resMovie = await movie.json()
            const dataMovie = await resMovie
            console.log(dataMovie)
            setMovie(prev => [
                ...prev,
                {...dataMovie.data, id: movies.length + 1},
            ])
            setTitle('')
            setFormat('')
            setYear('')
            setActors('')
        } catch (e) {
            throw new Error(`Failed: ${e}`);
        }
    }

    return (
        <div>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    createMovie()
                }}
            >
                <span>Title:</span>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <span>Year:</span>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <span>Add Actors: </span>
                <input
                    type="text"
                    className="actors"
                    placeholder={`"Benedict Timothy, ..."`}
                    value={actors}
                    onChange={(e) => setActors(e.target.value)}
                />
                <span>Format:</span>
                <select  value={format}
                         onChange={(e) => setFormat(e.target.value)}
                         className="form-select"
                         aria-label="Default select example">
                    <option value="">Choose a format</option>
                    <option value="VHS">VHS</option>
                    <option value="DVD">DVD</option>
                    <option value="Blu-Ray">Blu-Ray</option>
                </select>
                <button
                    type="submit"
                    className="btn btn-success"
                    title={!title.length || !year.length || !format.length ? 'please fill in all fields': ''}
                    disabled={!title.length || !year.length || !format.length || !actors.length}
                >
                    Add Film
                </button>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Find film:</span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                    <select
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                        onChange={(e) => setFilterBy(e.target.value)}
                    >
                        <option value="">By title</option>
                        <option value="BY_ACTORS">By actors</option>
                    </select>
                </div>

                <select name="" id="" onChange={(e) => sortByName(e.target.value)}>
                    <option value="">Change Sort</option>
                    <option value="name">SortByName</option>
                </select>
            </form>
        </div>
    )
}