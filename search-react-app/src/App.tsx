import { ChangeEvent, useState } from 'react';
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

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    input: localStorage.getItem(LOCAL_STORAGE_TITLE) || '',
    option: API_OPTIONS[0],
    result: null,
    isLoading: false,
  });

  const updateInput = (e: ChangeEvent) =>
    setAppState({ ...appState, input: (e.target as HTMLInputElement).value });

  const sendSearchRequest = async () => {
    setAppState({ ...appState, isLoading: true });
    localStorage.setItem(LOCAL_STORAGE_TITLE, appState.input);
    const result = await fetch(
      `${BASE_URL}/${appState.option}/?search=${appState.input}`
    );
    const searchResult = await result.json();
    setAppState({
      ...appState,
      input: '',
      result: searchResult.results,
      isLoading: false,
    });
  };

  const onChangeHandler = (e: ChangeEvent) =>
    setAppState({ ...appState, option: (e.target as HTMLSelectElement).value });

  return (
    <>
      <Header />
      <div className="container">
        <div className={appState.isLoading ? 'blured' : ''}>
          <SearchForm
            input={appState.input}
            updateInput={updateInput}
            sendSearchRequest={sendSearchRequest}
            onChangeHandler={onChangeHandler}
            isLoading={appState.isLoading}
          />
          <ResultsList result={appState.result} />
        </div>

        {appState.isLoading && <TbLoaderQuarter className="loader-icon" />}
      </div>
    </>
  );
};

export default App;
