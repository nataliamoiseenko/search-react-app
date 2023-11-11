import { useContext } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { DataContext } from '../App';
import { PaginationProps } from '../types';
import '../App.css';

const Pagination = ({ paginationHandler }: PaginationProps) => {
  const {
    searchState: { next, previous },
  } = useContext(DataContext);

  return (
    <div className="pagination__container">
      <button
        className="pagination__button"
        onClick={() => paginationHandler(previous)}
        disabled={!previous}
      >
        <AiOutlineArrowLeft />
      </button>

      <div className="pagination__current">
        {previous ? Number(previous.slice(-1)) + 1 : 1}
      </div>

      <button
        className="pagination__button"
        onClick={() => paginationHandler(next)}
        disabled={!next}
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
