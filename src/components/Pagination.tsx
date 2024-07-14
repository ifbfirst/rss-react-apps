type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

function Pagination(props: PaginationProps) {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className="pagination">
      <button
        className={disable.left ? 'arrow disabled' : 'arrow'}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        {'<'}
      </button>
      {nav && (
        <span className="">
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className={disable.right ? 'arrow disabled' : 'arrow'}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
