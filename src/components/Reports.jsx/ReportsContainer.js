import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Papa from 'papaparse';
import './ReportsContainer.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';

const ReportsContainer = () => {
  const [reportsData, setReportsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 
  const pagesToShow = 4; 

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await axios.get(`https://localhost:44311/api/SiteVisitdetails/details`);
        setReportsData(response.data);
      } catch (error) {
        console.error('Error fetching reports data:', error);
      }
    };

    fetchReportsData();
  }, []);

  const totalPages = Math.ceil(reportsData.length / itemsPerPage);

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportsData.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  const prevPagesBlock = () => {
    paginate(currentPage - pagesToShow);
  };

  const nextPagesBlock = () => {
    paginate(currentPage + pagesToShow);
  };

 
  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); i <= Math.min(totalPages, currentPage + Math.floor(pagesToShow / 2)); i++) {
    pageNumbers.push(i);
  }

 
  const exportToCSV = () => {
    // const csv = Papa.unparse(reportsData);
    // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // const link = document.createElement('a');
    // const url = URL.createObjectURL(blob);
    // link.setAttribute('href', url);
    // link.setAttribute('download', 'reportsData.csv');
    // link.style.visibility = 'hidden';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <div className="card">
      <div className="card-body">
      <button onClick={exportToCSV} className="export-button">
            Export to CSV
          </button>
        <div className="custom-container">
          <div className="grid-container">
            <div className="grid-header">SiteCode</div>
            <div className="grid-header">LastVisit</div>
            <div className="grid-header">Location</div>
            <div className="grid-header">Event</div>
            <div className="grid-header">FamilyMembers</div>
            <div className="grid-header">Associate Head count</div>
            <div className="grid-header">See Events</div>
            {currentItems.map((report, index) => (
              <React.Fragment key={index}>
                <div className="grid-item">{report.siteCode}</div>
                <div className="grid-item">{report.lastVisit}</div>
                <div className="grid-item">{report.countryName}</div>
                <div className="grid-item">{report.event}</div>
                <div className="grid-item">{report.familyNum}</div>
                <div className="grid-item">{report.associateHeadCount}</div>
                <div className="grid-item">
                  <i className="fas fa-eye"></i>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Pagination */}
          <div className="pagination">
            <button onClick={() => prevPagesBlock()} disabled={currentPage <= 1}>
              Prev
            </button>
            {pageNumbers.map((number) => (
              <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                {number}
              </button>
            ))}
            <button onClick={() => nextPagesBlock()} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ReportsContainer;
