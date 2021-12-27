import movies from './movie.txt'

const raw = {
    "email": "misharosa.music@gmail.com",
    "name": "Misha Rosa",
    "password": "super-password",
    "confirmPassword": "super-password"
}

const myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem('token'));

export const sendMovies = async () => {
    try {
        const formData = new FormData();
        const formattedMovies = await fetch(movies).then(response => response.blob());

        formData.append("movies", formattedMovies);

        const response = await fetch(`http://localhost:8000/api/v1/movies/import`, {
            method: 'POST',
            headers: {
                'Authorization':localStorage.getItem('token'),
            },
            body: formData,
            redirect: 'follow',
        });

        return response.json();
    } catch (error) {
        throw new Error(`Failed: ${error}`);
    }
};


export const deleteMovie = async (movieId) => {
    try {
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`http://localhost:8000/api/v1/movies/${movieId}`, requestOptions)
    const data = await response.json()

    return data.data
    } catch (e) {
        throw new Error(`Failed: ${e}`);
    }
}

export const getMovie = async () => {
    try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const resolve = await fetch("http://localhost:8000/api/v1/movies?sort=year&order=DESC&limit=50&offset=0", requestOptions)
    const data = await resolve.json()

    return data.data
    } catch (e) {
        throw new Error(`Failed: ${e}`);
    }
}

export const getMovieById = async (movieID) => {
    try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const resolve = await fetch(`http://localhost:8000/api/v1/movies/${movieID}`, requestOptions)
    const data = await resolve.json()
    console.log('data', data.data)
    return data.data
    } catch (e) {
        throw new Error(`Failed: ${e}`);
    }
}

export const createSession = async (url) => {
    try {

    let session = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
        }
    });

    const response = await session.json()
    const data = await response

    localStorage.setItem('token', data.token)

    } catch (e) {
        throw new Error(`Failed: ${e}`);
    }
}

export const createUser = async (url) => {
    try {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw),
        redirect: 'follow'
    });

    const data = await response.json()
        return data.data
    } catch (e) {
        throw new Error(`Failed: ${e}`);
    }
}