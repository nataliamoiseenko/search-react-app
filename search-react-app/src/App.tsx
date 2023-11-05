import React, { ChangeEvent } from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';
import './App.css';
import { BASE_URL, API_OPTIONS, LOCAL_STORAGE_TITLE } from './consts';
import Header from './components/Header';
import ResultsList from './components/ResultsList';
import SearchForm from './components/SearchForm';

type AppState = {
  input: string;
  option: string;
  result: [] | null;
  isLoading: boolean;
};

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      input: localStorage.getItem(LOCAL_STORAGE_TITLE) || '',
      option: API_OPTIONS[0],
      result: null,
      isLoading: false,
    };
  }

  updateInput = (e: ChangeEvent) =>
    this.setState({ input: (e.target as HTMLInputElement).value });

  sendSearchRequest = async () => {
    this.setState({ isLoading: true });
    localStorage.setItem(LOCAL_STORAGE_TITLE, this.state.input);
    const result = await fetch(
      `${BASE_URL}/${this.state.option}/?search=${this.state.input}`
    );
    const searchResult = await result.json();
    this.setState({
      input: '',
      result: searchResult.results,
      isLoading: false,
    });
  };

  onChangeHandler = (e: ChangeEvent) =>
    this.setState({ option: (e.target as HTMLSelectElement).value });

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className={this.state.isLoading ? 'blured' : ''}>
            <SearchForm
              input={this.state.input}
              updateInput={this.updateInput}
              sendSearchRequest={this.sendSearchRequest}
              onChangeHandler={this.onChangeHandler}
              isLoading={this.state.isLoading}
            />
            <ResultsList result={this.state.result} />
          </div>

          {this.state.isLoading && <TbLoaderQuarter className="loader-icon" />}
        </div>
      </>
    );
  }
}

export default App;
