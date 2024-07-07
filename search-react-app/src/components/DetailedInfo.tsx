import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { DetailedInfoProps } from '../types';

const DetailedInfo = ({
  closeDetailedInfo,
  detailedInfo,
}: DetailedInfoProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (detailContainer.current?.contains(event.target as Element)) return;

      closeDetailedInfo();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [closeDetailedInfo]);

  const detailContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="detail" ref={detailContainer}>
      <button className="detail__button" onClick={closeDetailedInfo}>
        <AiOutlineClose />
      </button>

      {Object.entries(detailedInfo).map(([key, value]) => {
        if (Array.isArray(value)) return;
        if (typeof value === 'string' && value.includes('https')) return;
        if (key === 'created' || key === 'edited') return;

        return (
          <p className="detail__row" key={key}>
            <span className="detail__left">{key.replace(/_/g, ' ')}:</span>
            <span className="detail__right">{value}</span>
          </p>
        );
      })}
    </div>
  );
};

export default DetailedInfo;
