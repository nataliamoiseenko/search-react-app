import { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import '../App.css';
import { API_OPTIONS } from '../consts';
import { DataContext } from '../App';

type SearchFormProps = {
  updateInput: (e: ChangeEvent) => void;
  sendSearchRequest: () => void;
  onChangeHandler: (e: ChangeEvent) => void;
  isLoading: boolean;
};

const SearchForm = ({
  updateInput,
  sendSearchRequest,
  onChangeHandler,
  isLoading,
}: SearchFormProps) => {
  const {
    formState: { input },
  } = useContext(DataContext);

  const onSubmitHandler = async (event: SyntheticEvent) => {
    if (!input.trim()) return;

    event.preventDefault();
    sendSearchRequest();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="Enter your search request"
          value={input}
          onChange={updateInput}
        />

        <select onChange={onChangeHandler} disabled={isLoading}>
          {API_OPTIONS.map((el) => (
            <option key={el} value={el}>
              {el[0].toUpperCase() + el.slice(1)}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isLoading || !input.trim()}>
          <RiSearchLine />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
