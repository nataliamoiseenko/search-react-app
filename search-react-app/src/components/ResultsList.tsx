import Pagination from './Pagination';

type ResultsListProps = {
  result: [] | null;
  next: string | null;
  previous: string | null;
  paginationHandler: (requestUrl: string | null) => void;
};

const ResultsList = ({
  result,
  next,
  previous,
  paginationHandler,
}: ResultsListProps) => (
  <>
    {result && result.length > 0 ? (
      <>
        <ul className="result-list">
          {result.map((el: { name?: string; title?: string }, i) => (
            <li key={i}>{el.name || el.title}</li>
          ))}
        </ul>

        <Pagination
          next={next}
          previous={previous}
          paginationHandler={paginationHandler}
        />
      </>
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
