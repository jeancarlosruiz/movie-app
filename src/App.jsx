import { useState, useCallback, useEffect } from 'react';
import { MovieList } from './components';
import { Input } from '@nextui-org/react';
import data from '../data.json';
import { uniqueID } from '../helper/uniqueId';

const initialState = () => {
  const storedMovies = localStorage.getItem('moviesList');

  return storedMovies ? JSON.parse(storedMovies) : data;
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState(initialState);

  const handleSearchTerm = useCallback(
    (value) => {
      setSearchTerm(value);
    },
    [searchTerm]
  );

  useEffect(() => {
    localStorage.setItem('moviesList', JSON.stringify(movies));
  }, [movies]);

  const handleFilteredMovies = () => {
    if (!searchTerm) {
      return movies;
    } else {
      return movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const onAddMovie = (title, description, category) => {
    const newMovie = {
      id: uniqueID(),
      title,
      description,
      category,
    };

    const prevMovies = JSON.parse(localStorage.getItem('moviesList'));
    const newMoviesList = [...prevMovies, newMovie];

    setMovies(newMoviesList);
  };

  const onDeleteMovie = () => {
    console.log('Eliminando Movie');
  };

  return (
    <>
      <h1>Movie App</h1>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input
          type='text'
          label='Movie Filter'
          placeholder='Enter your email'
          value={searchTerm}
          onChange={(e) => handleSearchTerm(e.target.value)}
        />
      </div>
      <MovieList
        movies={handleFilteredMovies()}
        onAddMovie={onAddMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default App;
