import { GoChevronRight } from 'react-icons/go';
import { ResultItemProps } from '../types';

const ResultItem = ({ item, getDetailedInfo }: ResultItemProps) => (
  <li className="result__item">
    {item.name || item.title}
    <button
      className="result__button"
      onClick={() => getDetailedInfo(item.url)}
    >
      More info
      <GoChevronRight />
    </button>
  </li>
);

export default ResultItem;
