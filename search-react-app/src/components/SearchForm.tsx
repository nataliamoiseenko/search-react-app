import React, { ChangeEvent, SyntheticEvent } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import '../App.css';
import { API_OPTIONS } from '../consts';

type SearchFormProps = {
  input: string;
  updateInput: (e: ChangeEvent) => void;
  sendSearchRequest: () => void;
  onChangeHandler: (e: ChangeEvent) => void;
  isLoading: boolean;
};

class SearchForm extends React.Component<SearchFormProps> {
  constructor(props: SearchFormProps) {
    super(props);
  }

  onSubmitHandler = async (event: SyntheticEvent) => {
    if (!this.props.input.trim()) return;

    event.preventDefault();
    this.props.sendSearchRequest();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            placeholder="Enter your search request"
            value={this.props.input}
            onChange={this.props.updateInput}
          />

          <select
            onChange={this.props.onChangeHandler}
            disabled={this.props.isLoading}
          >
            {API_OPTIONS.map((el) => (
              <option key={el} value={el}>
                {el[0].toUpperCase() + el.slice(1)}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={this.props.isLoading || !this.props.input.trim()}
          >
            <RiSearchLine />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
