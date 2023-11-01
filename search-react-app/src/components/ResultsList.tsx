type ResultsListProps = {
  result: [] | null;
};

const ResultsList = ({ result }: ResultsListProps) => (
  <>
    {result && result.length > 0 ? (
      <ul className="result-list">
        {result.map((el: { name?: string; title?: string }, i) => (
          <li key={i}>{el.name || el.title}</li>
        ))}
      </ul>
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
