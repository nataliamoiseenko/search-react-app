import { ChangeEvent, ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  isError: boolean;
};

export type SearchState = {
  result: [] | null;
  count: number | null;
  next: string | null;
  previous: string | null;
};

export type FormState = {
  input: string;
  option: string;
};

export type SearchFormProps = {
  updateInput: (e: ChangeEvent) => void;
  sendSearchRequest: () => void;
  onChangeHandler: (e: ChangeEvent) => void;
  isLoading: boolean;
};

export type DataContextType = {
  formState: FormState;
  searchState: SearchState;
};

export type DetailedInfoProps = {
  closeDetailedInfo: () => void;
  detailedInfo: Record<string, never | string | []>;
};

export type PaginationProps = {
  paginationHandler: (requestUrl: string | null) => void;
};

export type ResultItemProps = {
  item: {
    name?: string;
    title?: string;
    url: string;
  };
  getDetailedInfo: (requestUrl: string) => void;
};

export type ResultsListProps = {
  sendSearchRequest: (requestUrl: string | null) => void;
  getDetailedInfo: (requestUrl: string) => void;
};
