import React from 'react';

type ResultsListProps = {
  result: [] | null;
};

class ResultsList extends React.Component<ResultsListProps> {
  constructor(props: ResultsListProps) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.result && this.props.result.length > 0 ? (
          <ul className="result-list">
            {this.props.result.map(
              (el: { name?: string; title?: string }, i) => (
                <li key={i}>{el.name || el.title}</li>
              )
            )}
          </ul>
        ) : this.props.result ? (
          <>
            <p>No results</p>
            <pre>:(</pre>
          </>
        ) : (
          <p>Start searching</p>
        )}
      </>
    );
  }
}

export default ResultsList;
