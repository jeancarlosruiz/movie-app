import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';

function Movie({ movie, onDeleteMovie }) {
  return (
    <Card className='py-4'>
      <CardHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className='pb-0 pt-2 px-4'
      >
        <h2 className='font-bold text-large'>{movie.Title}</h2>
        <Button
          isIconOnly
          color='danger'
          aria-label='Like'
          onClick={() => onDeleteMovie(movie.Id)}
          style={{
            padding: '0.5rem',
            borderRadius: '50%',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-trash'
          >
            <polyline points='3 6 5 6 21 6'></polyline>
            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
          </svg>
        </Button>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <p className='text-tiny uppercase font-bold'>{movie.Description}</p>
      </CardBody>
    </Card>
  );
}

export default Movie;
