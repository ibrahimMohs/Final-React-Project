import React from 'react';

interface MoviePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const MoviePagination: React.FC<MoviePaginationProps> = ({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      {currentPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {currentPage > 2 && <span>...</span>}
        </>
      )}
      <button className="active">{currentPage}</button>
      {currentPage < totalPages && (
        <>
          {currentPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default MoviePagination;
