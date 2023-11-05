import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type DetailedInfoProps = {
  setDetailedInfo: Dispatch<SetStateAction<{ isOpen: boolean; data: object }>>;
  detailedInfo: Record<string, never | string | []>;
};

const DetailedInfo = ({ setDetailedInfo, detailedInfo }: DetailedInfoProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (detailContainer.current?.contains(event.target as Element)) return;

      setDetailedInfo({ isOpen: false, data: {} });
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [setDetailedInfo]);

  const detailContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="detail" ref={detailContainer}>
      <button
        className="detail__button"
        onClick={() => setDetailedInfo({ isOpen: false, data: {} })}
      >
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
