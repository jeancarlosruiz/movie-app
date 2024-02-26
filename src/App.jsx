import { useState, useCallback, useEffect } from 'react';
import { MovieList } from './components';
import { Input } from '@nextui-org/react';
import data from '../data.json';
import { uniqueID } from '../helper/uniqueID';

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
      Id: uniqueID(),
      Title: title,
      Description: description,
      Category: category,
    };

    const prevMovies = JSON.parse(localStorage.getItem('moviesList'));
    const newMoviesList = [...prevMovies, newMovie];

    setMovies(newMoviesList);
  };

  const onDeleteMovie = (id) => {
    const movieDeleted = movies.filter((movie) => movie.Id !== id);

    setMovies(movieDeleted);
  };

  return (
    <>
      <header className='bg-blue-500 py-4'>
        {/* <h1 className='text-center text-xl text-slate-200'>Movie App</h1> */}
        <h1 className='text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-200'>
          Movie App
        </h1>
      </header>
      <div className='px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
        <Input
          type='text'
          label='Movie Filter'
          placeholder='Enter your email'
          value={searchTerm}
          onChange={(e) => debounce(handleSearchTerm(e.target.value), 750)}
          className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 max-w-lg mx-auto'
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
