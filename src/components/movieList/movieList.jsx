import { useState } from 'react';
import { Movie } from '../index.js';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';

function MovieList({ movies, onAddMovie, onDeleteMovie }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categrySelected, setCategorySelected] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const categories = [
    { value: 'Crime', label: 'Crime' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Thriller', label: 'Thriller' },
  ];

  const handleOpen = () => {
    setTitle('');
    setDescription('');
    setCategorySelected('');
    onOpen();
  };

  const handleOnAddmovie = () => {
    onAddMovie(title, description, categrySelected);
    onClose();
  };

  return (
    <>
      <div className='flex flex-wrap gap-3'>
        <Button
          variant='flat'
          color='warning'
          onPress={() => handleOpen()}
          className='capitalize'
        >
          Add a new movie
        </Button>
      </div>
      <section className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {movies.map((movie) => (
          <Movie key={movie.Id} movie={movie} onDeleteMovie={onDeleteMovie} />
        ))}
      </section>

      <Modal
        backdrop='opaque'
        isOpen={isOpen}
        onClose={onClose}
        placement='top-center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Add a new movie
              </ModalHeader>
              <ModalBody>
                <Input
                  type='text'
                  label='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  label='Description'
                  placeholder='Enter your description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select
                  label='Select a category'
                  selectedKeys={[categrySelected]}
                  onChange={(e) => setCategorySelected(e.target.value)}
                  className='max-w-xs'
                >
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={handleOnAddmovie}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default MovieList;
