import { useContext } from 'react';
import Pagination from './Pagination';
import ResultItem from './ResultItem';
import { DataContext } from '../App';

type ResultsListProps = {
  sendSearchRequest: (requestUrl: string | null) => void;
  getDetailedInfo: (requestUrl: string) => void;
};

const ResultsList = ({
  sendSearchRequest,
  getDetailedInfo,
}: ResultsListProps) => {
  const {
    searchState: { result },
  } = useContext(DataContext);

  return (
    <>
      {result && result.length > 0 ? (
        <div className="result-list__container">
          <ul className="result-list">
            {result.map(
              (el: { name?: string; title?: string; url: string }, i) => (
                <ResultItem
                  key={i}
                  item={el}
                  getDetailedInfo={getDetailedInfo}
                />
              )
            )}
          </ul>

          <Pagination paginationHandler={sendSearchRequest} />
        </div>
      ) : result ? (
        <>
          <p>No results</p>
        </>
      ) : (
        <p>Start searching</p>
      )}
    </>
  );
};

export default ResultsList;
