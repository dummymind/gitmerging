import React, { useState, useEffect } from 'react';

import calendaricon from '../../images/vector_x2.svg'
import axios from 'axios';
import './RequestHeader.css';
//const [eventFormData, seteventFormData] = useState({});


export default function RequestHeader() {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
      useEffect(() => {
          
          const items = JSON.parse(localStorage.getItem('eventFormData'));
        if (items) {
          setEventTitle(items.eventTitle ==''? 'Click here to modify the event'  :items.eventTitle);
          setEventDate(items.eventDate ==''? 'TBD'  :items.eventDate);
        }
      }, []);
    return (<requestHeader className="requestHeader">
        <div className="container-fluid">
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
        </div>

    </requestHeader>
    );

}