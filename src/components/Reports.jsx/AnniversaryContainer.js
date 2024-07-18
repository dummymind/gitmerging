import React, { useState, useEffect } from 'react';
//import { FaCalendarAlt } from 'react-icons/fa';
import './AnniversaryContainer.css';

function AnniversaryContainer() {
  const [startRangeDate, setStartRangeDate] = useState('');
  const [endRangeDate, setEndRangeDate] = useState('');
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:44311/api/SiteVisitdetails/anniversarydetails');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGridData(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStartDateChange = (e) => {
    setStartRangeDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndRangeDate(e.target.value);
  };

  const filterDataByDateRange = () => {
    return gridData.filter(item => {
      const eventDate = new Date(item.eventDate);
      if (startRangeDate && endRangeDate) {
        const startDate = new Date(startRangeDate);
        const endDate = new Date(endRangeDate);
        return eventDate >= startDate && eventDate <= endDate;
      }
      return true;
    });
  };

  const renderFilteredData = filterDataByDateRange();

  return (
    <div className="anniversary-container">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <div className="form-inline">
              <label htmlFor="dateRange" className="mr-2">Date Range:</label>
              <div className="date-range-section">
              <span className="mx-2">from</span>
                <div className="date-picker">
                
                  <input
                    type="date"
                    id="startDate"
                    value={startRangeDate}
                    onChange={handleStartDateChange}
                    className="form-control"
                  />
                </div>
                <span className="mx-2">to</span>
                <div className="date-picker">
                 
                  <input
                    type="date"
                    id="endDate"
                    value={endRangeDate}
                    onChange={handleEndDateChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-container mt-3">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Site Code</th>
              <th scope="col">Event Date</th>
            </tr>
          </thead>
          <tbody>
            {renderFilteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.siteCode}</td>
                <td>{new Date(item.eventDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnniversaryContainer;
