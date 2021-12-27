import React, { useState } from "react";
import Modal  from 'react-modal';
import "./MoviesList.css"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 500
    },
};

export const MovieList = ({ movies, deleteMovie, findMovieById, findBuId, setMovie }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div className="movies-container">
        { !!movies.length &&
            movies.map(movie => (
                <>
            <div className="card" style={{width: '18rem'}}>
                <img src="https://image.freepik.com/free-vector/cinema-reel-film-tape-icon_24908-22120.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Year: {movie.year}</li>
                        <li className="list-group-item">
                            Actors: {movie.actors.map((actor, index) => {
                                if (movie.actors.length === index + 1) {
                                    return actor.name
                                } else {
                                    return actor.name + ', '
                                }
                        })}
                        </li>
                        <li className="list-group-item">Format: {movie.format}</li>
                        <li className="list-group-item movie__item-date">published: {movie.createdAt.slice(0,-8).split('T').join(' ')}</li>
                    </ul>
                    <div className="card-body">
                        <button
                            type="button"
                            onClick={() => {
                                findMovieById(movie.id)
                                setIsOpen(true)
                            }}
                            className="btn btn-outline-secondary"
                        >
                            Details
                        </button>
                        <button
                                type="button"
                                className="btn btn-outline-secondary"
                            onClick={() => {
                            deleteMovie(movie.id)
                            setMovie(prev => prev.filter(film => film.id !== movie.id))
                        }}
                        >
                            Delete
                        </button>
                    </div>
            </div>
                </>
            ))}
            {modalIsOpen &&
                <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
                >
                        <img
                            src="https://image.freepik.com/free-vector/cinema-reel-film-tape-icon_24908-22120.jpg"
                            className="card-img-top modal_img" alt="modal img"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{findBuId.title}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Year: {findBuId.year}</li>
                            <li className="list-group-item">Format: {findBuId.format}</li>
                            <li className="list-group-item">
                                Actors: {findBuId.actors.map((actor, index) => {
                                if (findBuId.actors.length === index + 1) {
                                    return actor.name
                                } else {
                                    return actor.name + ', '
                                }
                            })}
                            </li>
                            <li className="list-group-item movie__item-date">published: {findBuId.createdAt.slice(0,-8).split('T').join(' ')}</li>
                        </ul>
                        <div className="card-body">
                            <button
                                onClick={() => {
                                setIsOpen(false);
                                deleteMovie(findBuId.id)
                                setMovie(prev => prev.filter(film => film.id !== findBuId.id))
                            }}
                                type="button"
                                className="btn btn-outline-secondary"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                className="btn btn-outline-secondary"
                            >
                                Close
                            </button>
                        </div>
                </Modal>
                }
        </div>
)}