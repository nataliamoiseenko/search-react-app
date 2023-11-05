import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TbLoaderQuarter } from 'react-icons/tb';
import { BASE_URL, API_OPTIONS, LOCAL_STORAGE_TITLE } from './consts';
import Header from './components/Header';
import ResultsList from './components/ResultsList';
import SearchForm from './components/SearchForm';
import DetailedInfo from './components/DetailedInfo';
import './App.css';

type SearchState = {
  result: [] | null;
  count: number | null;
  next: string | null;
  previous: string | null;
};

type FormState = {
  input: string;
  option: string;
};

const App = () => {
  const [formState, setFormState] = useState<FormState>({
    input: localStorage.getItem(LOCAL_STORAGE_TITLE) || '',
    option: API_OPTIONS[0],
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [searchState, setSearchState] = useState<SearchState>({
    result: null,
    count: null,
    next: null,
    previous: null,
  });

  const [detailedInfo, setDetailedInfo] = useState({
    isOpen: false,
    data: {},
  });

  const [_searchParams, setSearchParams] = useSearchParams();

  const updateInput = (e: ChangeEvent) =>
    setFormState({ ...formState, input: (e.target as HTMLInputElement).value });

  const sendSearchRequest = async (requestUrl: string | null = null) => {
    setLoading(true);
    if (!requestUrl) localStorage.setItem(LOCAL_STORAGE_TITLE, formState.input);

    const requestUrlString = requestUrl
      ? requestUrl
      : `${BASE_URL}/${formState.option}/?search=${formState.input}`;

    const queryParamsObj = new URLSearchParams(requestUrlString.split('?')[1]);
    setSearchParams(queryParamsObj);

    const response = await fetch(requestUrlString);
    const { results: result, count, next, previous } = await response.json();
    setFormState({
      ...formState,
      input: '',
    });

    setLoading(false);

    setSearchState({
      result,
      count,
      next,
      previous,
    });
  };

  const getDetailedInfo = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    const processedResponse = await response.json();
    setDetailedInfo({
      isOpen: true,
      data: processedResponse,
    });
    setLoading(false);
  };

  const onChangeHandler = (e: ChangeEvent) =>
    setFormState({
      ...formState,
      option: (e.target as HTMLSelectElement).value,
    });

  return (
    <>
      <Header />
      <div className="container">
        <div className={loading ? 'blured' : ''}>
          <SearchForm
            input={formState.input}
            updateInput={updateInput}
            sendSearchRequest={sendSearchRequest}
            onChangeHandler={onChangeHandler}
            isLoading={loading}
          />

          <div
            className={`result__container ${
              detailedInfo.isOpen ? '_open' : ''
            }`}
          >
            <ResultsList
              result={searchState.result}
              next={searchState.next}
              previous={searchState.previous}
              sendSearchRequest={sendSearchRequest}
              getDetailedInfo={getDetailedInfo}
            />

            {detailedInfo.isOpen && (
              <DetailedInfo
                setDetailedInfo={setDetailedInfo}
                detailedInfo={detailedInfo.data}
              />
            )}
          </div>
        </div>

        {loading && <TbLoaderQuarter className="loader-icon" />}
      </div>
    </>
  );
};

export default App;
