import React, { useState, useEffect } from 'react';
import calendaricon from '../../images/vector_x2.svg'
import capture_decran from '../../images/capture_decran_20240315_a_11124.png'
import './Schedule.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import RequestHeader from './RequestHeader';
import EventSideBar from './EventSideBar';

function Schedule()
{
  const [eventFormData, setEventFormData] = useState({
    // Initialize your form data state here
    requestedBy: '',
    eventTitle: '',
    associateSegment: '',
    email: '',
    phone: '',
    eventDate: '',
    siteCode: '',
    countryName: '',
    stateName: '',
    cityName: '',
    eventVenueName: '',
    eventAddress: '',
    eventType: '',
    eventFormat: '',
    totalAttendees: '',
    schedule:{
      visitSummary:'',
      draftItinerary:''
    },
    maxFamilyNum:false,
    FamilyNum:0,
    SpecificFamilyMem:false,
    NameOfMem:'',
    IsScheduleChange:false
  });
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('eventFormData'));
    if (items && items.length !=0) {
   // setDataStore(items);
   setEventFormData(items);
  }
  }, []); 


  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  const handleScheduleAgendaChange = (e) => {
    eventFormData.schedule.visitSummary= e;
    eventFormData.IsScheduleChange=true;
    localStorage.setItem('eventFormData', JSON.stringify(eventFormData));
    
  };
  const handleScheduleItenaryChange = (e) => {
      eventFormData.schedule.draftItinerary= e;
      eventFormData.IsScheduleChange=true;
      localStorage.setItem('eventFormData', JSON.stringify(eventFormData));
      
};
    return (

        <div>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
    
          <div className='container-fluid-custom'>
            {/* <div className="container-fluid">
              <div className="bd-placeholder-img custom-jumbotron jumbotron p-6 mt-3 p-md-3 text-white rounded mb-2 d-flex flex-column justify-content-end m-4">
                <div className="row bottom-row ml-2 mr-2">
                  <div className="col-12 col-md-8 p-2 px-0 bg-light rounded mb-5 mb-md-0 ">
                    <div className="content">
                      <h6>
                        <strong>Click here to modify the event</strong>
                      </h6>
                      <p>
                        <strong>
                          <img src={calendaricon} />
                          Event date: TBD
                        </strong>
                      </p>
                      <p>Status</p>
                      <div className="breadcrumb btn-group btn-breadcrumb rounded">
                        <a
                          href="#"
                          className="btn-custom btn btn-default selectbreadcrumb"
                        >
                          Draft
                        </a>
                        <a href="#" className="btn-custom btn btn-default">
                          Under Review
                        </a>
                        <a href="#" className="btn-custom btn btn-default">
                          Open Event
                        </a>
                        <a href="#" className="btn-custom btn btn-default">
                          Attendance confirmed
                        </a>
                        <a href="#" className="btn-custom btn btn-default">
                          Pending documentation
                        </a>
                        <a href="#" className="btn-custom btn btn-default">
                          Completed
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 px-0 position-relative">
                    <div className=" p-3 position-relative" style={{ height: "100%" }}>
                      <div className="bg-white rounded p-3 position-absolute bottom-0 end-0">
                        <button
                          type="button"
                          className="btn-custom btn btn-outline-primary "
                        >
                          <strong>UPLOAD COVER IMAGE</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <RequestHeader/>
            <div className="container-fluid">
              <div className="row m-2 mb-5">
                {/* <div className="col-md-3">
                  <ul className="nav nav-custom flex-column">
                    <li className="nav-item">
                        <NavLink to="/event" className="nav-custom nav-link">
                            EVENT DETAILS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                          <NavLink to="/schedule" className="nav-custom nav-link">
                            SCHEDULE & ITINERARY
                         </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/guests" className="nav-custom nav-link">
                        GUESTS
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/history" className="nav-custom nav-link">
                        HISTORY & COMMENTS
                     </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/summary" className="nav-custom nav-link">
                        POST EVENT SUMMARY
                    </NavLink>
                    </li>
                  </ul>
                </div> */}
                <EventSideBar/>
    
                <div className="col-md-9">
              
 <div className=" bg-light rounded my-4 p-4 mt-3 visit-summary">
    <div className="visit-title">Visit Summary</div>
      <div className="guidance">
        <strong>Guidances :</strong> Please share here what you expect to be on the agenda for this visit
      </div>
      <ReactQuill
        theme="snow"
        value={eventFormData.schedule.visitSummary}
        name="visitSummary"
        onChange={handleScheduleAgendaChange}
        modules={modules}
        formats={formats}
        placeholder="Please share here what you expect to be on the agenda for this visit"
      />
    </div>
  
  <div className=" bg-light my-4 p-4 rounded p-3 ">
    <div className="itinerary-title">draft itinerary</div>
    <div className="guidance">
        <strong>Guidances :</strong> Please share here what you expect to be the itenary for this visit
      </div>
      <ReactQuill
        theme="snow"
        name="draftItinerary"
        value={eventFormData.schedule.draftItinerary}
        onChange={handleScheduleItenaryChange}
        modules={modules}
        formats={formats}
        placeholder="Please share here what you expect to be the itenary for this visit"
      />
    </div>
  
  <div className=" bg-light rounded p-4 mt-3">
    <label htmlFor="staticEmail" className="custom-font col-form-label">
      BRIEF
    </label>
    <div className="m-3">
      <button
        type="button"
        className="btn-custom-schedule-warning btn btn-outline-warning "
      >
        DOWNLOAD THIS BRIEF FILE
      </button>
      <button
        type="button"
        className="btn-custom-schedule-warning btn btn-outline-warning "
      >
        UPLOAD THIS BRIEF FILE
      </button>
      <button
        type="button"
        className="btn-custom-schedule-warning btn btn-outline-warning"
      >
        DELETE THIS BREIF FILE
      </button>
    </div>
  
  </div>
  <div className="bg-light rounded p-4 mt-3 mb-5">
    <label htmlFor="staticEmail" className="custom-font col-form-label">
      ATTACHMENTS
    </label>
    <div className="m-2">
      <button
        type="button"
        className="btn-custom-schedule btn btn-outline-danger"
      >
        UPLOAD NEW ATTACHMENT
      </button>
    </div>
    <ul className="list-group">
      <li className="list-group-item-custom list-group-item m-1 d-flex justify-content-between align-items-center">
        <span>
          <u>Attachmentfile.pdf</u>
          <span> 28 Mo</span> <span> PDF</span>
        </span>
        <span className="">
          <i className="fa-regular fa-trash-can" />
        </span>
      </li>
      <li className="list-group-item-custom list-group-item m-1 d-flex justify-content-between align-items-center">
        <span>
          <u>Attachmentfile.docx</u>
          <span> 28 Mo</span> <span> Doc</span>
        </span>
        <span className="">
          <i className="fa-regular fa-trash-can" />
        </span>
      </li>
      <li className="list-group-item-custom list-group-item m-1 d-flex justify-content-between align-items-center">
        <span>
          <u>Link to Mars Drive file</u>
          <span> 28 Mo</span> <span> URL link</span>
        </span>
        <span className="">
          <i className="fa-regular fa-trash-can" />
        </span>
      </li>
    </ul>
  </div>





                </div>


              </div>
            </div>
            <Footer />
          </div>
        </div >
    
      );
    




    }

export default Schedule;