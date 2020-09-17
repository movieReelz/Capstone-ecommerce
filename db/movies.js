const client = require('./client');

async function createMovies({title, genre, price, rated}){
    try {
        const {rows: [movie]} = await client.query(`
        INSERT INTO movies(title, genre, price, rated)
        VALUES ($1, $2, $3, $4);
        `,[title, genre, price, rated]);
    } catch (error) {
        console.error(error);
    }
}

async function getMovieById(id){
    try {
        const {rows: [movie]} = await client.query(`
        SELECT * FROM movies
        WHERE id=$1
        RETURNING *;
        `,[id]);

        return movie;
    } catch (error) {
        console.error(error);
    }
}

async function deleteMovie(id){
    try {
        await client.query(`
        DELETE FROM movie
        WHERE id=$1;
        `);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createMovies,
    getMovieById,
    deleteMovie,
}