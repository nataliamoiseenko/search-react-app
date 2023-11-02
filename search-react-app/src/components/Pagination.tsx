import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import '../App.css';

type PaginationProps = {
  next: string | null;
  previous: string | null;
  paginationHandler: (requestUrl: string | null) => void;
};

const Pagination = ({ next, previous, paginationHandler }: PaginationProps) => {
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
