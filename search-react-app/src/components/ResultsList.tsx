import Pagination from './Pagination';
import ResultItem from './ResultItem';

type ResultsListProps = {
  result: [] | null;
  next: string | null;
  previous: string | null;
  sendSearchRequest: (requestUrl: string | null) => void;
  getDetailedInfo: (requestUrl: string) => void;
};

const ResultsList = ({
  result,
  next,
  previous,
  sendSearchRequest,
  getDetailedInfo,
}: ResultsListProps) => (
  <>
    {result && result.length > 0 ? (
      <div className="result-list__container">
        <ul className="result-list">
          {result.map(
            (el: { name?: string; title?: string; url: string }, i) => (
              <ResultItem key={i} item={el} getDetailedInfo={getDetailedInfo} />
            )
          )}
        </ul>

        <Pagination
          next={next}
          previous={previous}
          paginationHandler={sendSearchRequest}
        />
      </div>
    ) : result ? (
      <>
        <p>No results</p>
        <pre>:(</pre>
      </>
    ) : (
      <p>Start searching</p>
    )}
  </>
);

export default ResultsList;
