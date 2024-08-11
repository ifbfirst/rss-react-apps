'use client';
import { useDispatch, useSelector } from 'react-redux';
import { clearPersonList } from '../stores/peopleSlice';
import { RootState } from '../stores/reducers';
import { CSVLink } from 'react-csv';
import React from 'react';

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
      <CSVLink
        className="download-btn"
        data={personList}
        filename={`${personList.length}_people.csv`}
      >
        Download
      </CSVLink>
    </div>
  );
};

export default FlyoutBox;
