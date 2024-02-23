import { Movie } from '../index.js';

function MovieList({ movies, onAddMovie, onDeleteMovie }) {
  return (
    <>
      <section>
        {movies.map((movie) => (
          <Movie key={movie.Id} movie={movie} />
        ))}
      </section>
    </>
  );
}

export default MovieList;
