import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format tanggal: Kamis, 17 April 2025
  const formatTanggal = (tanggal) => {
    return tanggal.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative inline-block">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        customInput={
          <button className="bg-[#63B8F5] hover:bg-[#52A5E0] text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow">
            <FaRegCalendarAlt className="text-white" />
            <span>{formatTanggal(selectedDate)}</span>
          </button>
        }
      />
    </div>
  );
}

export default CustomDatePicker;
