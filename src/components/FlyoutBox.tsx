import { RootState } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { clearPersonList } from '../stores/peopleSlice';

const FlyoutBox = () => {
  const dispatch = useDispatch();
  const { personList } = useSelector((state: RootState) => state.people);
  return (
    <div className="flyout-box">
      <p>{personList.length} items are selected</p>
      <button
        className="unselect-btn"
        onClick={() => {
          dispatch(clearPersonList());
        }}
      >
        Unselect all
      </button>
      <button className="download-btn">Download</button>
    </div>
  );
};

export default FlyoutBox;
