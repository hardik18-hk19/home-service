import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SingleDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
      />
      <div style={{ marginTop: '20px' }}>
        <p style={{ color: '#7f57f1' }}>
          <strong>Selected Date:</strong> {formatDate(selectedDate)}
        </p>
      </div>
    </div>
  );
};

export default SingleDatePicker;
