
import React, { useState, useEffect } from 'react';
import calendaricon from '../../images/vector_x2.svg'
import globeimage from '../../images/capture_decran_20240318_a_14532.jpg';
import '../ResponsiveEvent.jsx/Event.css';
import { EventDetails } from "../ResponsiveEvent.jsx/CreateEvent.ts";
import { NavLink } from 'react-router-dom';
import MapComponent from '../GetEvent.jsx/MapComponent.js';
import Footer from '../Footer'
import Header from '../Header.js';
import RequestHeader from '../ResponsiveEvent.jsx/RequestHeader.js';
import './RequestHeader.css';
import EventSideBar from './EventSideBar.js';
import axios from 'axios';


function Event() {
  
  const [eventId, seteventId] = useState(0);
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

  const [errors, setErrors] = useState({});
  const [eventCoHost, seteventCoHost] = useState('');
  const [coHostEmail, setcoHostEmail] = useState('');
  const [siteCode, setsiteCode] = useState('');
  const [eventVenueName, seteventVenueName] = useState('');
  const [eventAddress, seteventVenueAddress] = useState('');
  const [eventType, setEventTypes] = useState([]);
  const [eventFormat, setEventFormat] = useState([]);
  const [lastVisit, setlastVisit] = useState([]);
  const [totalAttendees, settotalAttendes] = useState('');
  const [associateAtEvent, setassociateAtEvent] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [phoneCode, setphoneCode] = useState([]);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);

  // const items = JSON.parse(localStorage.getItem('eventFormData'));
  // if (items) {
  //   eventFormData =items;
  // };


  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchEventTypes();
    fetchEventFormat();
    fetchLastVisit();
    fetchAssociateAtEvent();
    fetchPhonecode();
    fetchCountry();
    // fetchState();
    // fetchCity();
    const items = JSON.parse(localStorage.getItem('eventFormData'));
  if (items && items.length !=0) {
   // setDataStore(items);
    setEventFormData(items);
  }
  else{
    localStorage.setItem('eventFormData', JSON.stringify(eventFormData));
  }
  }, []); 
  // Empty dependency array to run only once on component mount

  const fetchEventTypes = async () => {
    try {
      const response = await axios.get('https://localhost:44311/api/EventDetails/EventType');
      console.log("Resonse of EventType is", response);
      setEventTypes(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  const fetchEventFormat = async () => {
    try {
      const response = await axios.get('https://localhost:44311/api/EventDetails/EventFormat');
      console.log("Resonse of EventFormat is", response);
      setEventFormat(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  const fetchLastVisit = async () => {
    try {
      const response = await axios.get('https://localhost:44311/api/EventDetails/IntervalBetweenLastVisit');
      console.log("Resonse of Interview Bwtween Last Visit is", response);
      setlastVisit(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  const fetchAssociateAtEvent = async () => {
    try {
      const response = await axios.get('https://localhost:44311/api/EventDetails/AssociateAtEvent');
      console.log("Resonse of Interview Bwtween Last Visit is", response);
      setassociateAtEvent(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };
  const fetchPhonecode = async () => {
    try {
      const response = await axios.get('https://localhost:44311/CountryCode');
      console.log("Resonse of EventType is", response);
      setphoneCode(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };
  const fetchCountry = async () => {
    try {
      const response = await axios.get('https://localhost:44311/Country');
      console.log("Resonse of EventType is", response);
      setcountry(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };
  const fetchState = async (countryName) => {
    try {
      const response = await axios.get('https://localhost:44311/State/'+countryName);
      console.log("Resonse of EventType is", response);
      setstate(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };
  const fetchCity = async (stateName) => {
    try {
      const responseCity = await axios.get('https://localhost:44311/City/'+stateName);
      console.log("Resonse of EventType is", responseCity);
      setcity(responseCity.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };



  const handleChange = (e) => {
    var data = e.target.name; 
    const { fname, value, type, checked } = e.target;
    
    let errorMessage = '';
  
    // Perform validation for each field
    if (fname === 'requestedBy' && value.trim() === '') {
      errorMessage = 'Requested by is required';
    } else if (fname === 'eventTitle' && value.trim() === '') {
      errorMessage = 'Event title is required';
    } else if (fname === 'associateSegment' && value.trim() === '') {
      errorMessage = 'Associate segment is required';
    } else if (fname === 'email' && value.trim() === '') {
      errorMessage = 'Email is required';
    } else if (fname === 'phone' && value.trim() === '') {
      errorMessage = 'Phone is required';
    } else if (fname === 'eventDate' && value.trim() === '') {
      errorMessage = 'Event date is required';
    } else if (fname === 'siteCode' && value.trim() === '') {
      errorMessage = 'Site code is required';
    } else if (fname === 'countryName' && value.trim() === '') {
      errorMessage = 'Country name is required';
    } else if (fname === 'stateName' && value.trim() === '') {
      errorMessage = 'State name is required';
    } else if (fname === 'cityName' && value.trim() === '') {
      errorMessage = 'City name is required';
    } else if (fname === 'eventVenueName' && value.trim() === '') {
      errorMessage = 'Event venue name is required';
    } else if (fname === 'eventAddress' && value.trim() === '') {
      errorMessage = 'Event address is required';
    } else if (fname === 'eventType' && value.trim() === '') {
      errorMessage = 'Event type is required';
    } else if (fname === 'eventFormat' && value.trim() === '') {
      errorMessage = 'Event format is required';
    } else if (fname === 'totalAttendees' && value.trim() === '') {
      errorMessage = 'Total attendees is required';
    } else if (fname === 'email' && !(/^\S+@\S+\.\S+$/.test(value))) {
      errorMessage = 'Please enter a valid email address';
    } else if (fname === 'phone' && !(/^[0-9]{10}$/.test(value))) {
      errorMessage = 'Please enter a valid phone number';
    } else if (fname === 'lastVisit' && value.trim() === '') {
      errorMessage = 'Please select a range for last visit';
    }
    // } else if (name === 'estimatedMars' && value.trim() === '') {
    //   errorMessage = 'Please select a range for estimated mars';
    // }
  
    setErrors({ ...errors, [fname]: errorMessage });
  
    // Update the state based on the type of input field
    // if (type === 'checkbox') {
    //   setEventFormData({ ...eventFormData, [name]: checked });
    // } else 
    if (data == "eventType" || data == "eventFormat" || data == "lastVisit" || data == "cityName" ) {
      setEventFormData({ ...eventFormData, [e.target.name]: e.target.options[e.target.selectedIndex].text });
 
    }
    else if(data == "countryName")
    {
      setEventFormData({ ...eventFormData, [e.target.name]: e.target.options[e.target.selectedIndex].text });
       // useEffect(() => {
          fetchState(e.target.options[e.target.selectedIndex].text);
        //}, []); 
    }
    else if(data == "stateName")
      {
        setEventFormData({ ...eventFormData, [e.target.name]: e.target.options[e.target.selectedIndex].text });
      //  useEffect(() => {
          fetchCity(e.target.options[e.target.selectedIndex].text);
      //  }, []); 
      } else if (data === 'associateAtEvent') {
        if (e.target.checked) {
          setSelectedOptions([...selectedOptions, { value: e.target.value }]);
        }
        else {
          setSelectedOptions(selectedOptions.filter(item => item.value !== e.target.value));
  
        }
        setEventFormData({ ...eventFormData, "associates": selectedOptions.map(x => x.value) });
    } else if(data === 'isDateFlexible')
      {
        setEventFormData({ ...eventFormData, [e.target.name]: e.target.checked });
      } 
    else {
      setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
      }
      localStorage.setItem('eventFormData', JSON.stringify(eventFormData));
      localStorage.setItem('errors', JSON.stringify(errors));
  };
  
 
  return (
    
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

      <div className='container-fluid-custom'>

        <Header/>
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
            <EventSideBar  />
          

            <div className="col-md-6">
              <form id="eventDetailsform">
                <div className=" bg-light rounded p-3 ">

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      REQUESTED BY
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        readOnly=""
                        className="custom-font-lt form-control-plaintext disabled"
                        id="staticEmail"
                        name="requestedBy"
                        value={eventFormData.requestedBy}
                        onChange={handleChange}
                        placeholder="name" 
                      />
                      {errors.requestedBy && <div style={{ color: 'red',fontSize:"13px" }}>{errors.requestedBy}</div>}
    
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      TITLE
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        readOnly=""
                        className="custom-font-lt form-control-plaintext disabled"
                        id="staticEmail"
                        name="eventTitle"
                        value={eventFormData.eventTitle}
                        onChange={handleChange}
                        placeholder="Title"  
                      />
                      {errors.eventTitle && <div style={{ color: 'red',fontSize:"13px" }}>{errors.eventTitle}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      ASSOCIATE'S SEGMENT
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        readOnly=""
                        className="custom-font-lt form-control disabled"
                        id="staticEmail"
                        name="associateSegment"
                        value={eventFormData.associateSegment}
                        onChange={handleChange}
                        placeholder="Mars Global Services"
                      />
                       {errors.associateSegment && <div style={{ color: 'red',fontSize:"13px" }}>{errors.associateSegment}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label disabled"
                    >
                      E-MAIL
                    </label>
                    <div className="col-sm-8 ">
                      <u>
                        <input
                          type="text"
                          readOnly=""
                          className="custom-font-lt form-control-plaintext"
                          id="staticEmail"
                          name="email"
                          value={eventFormData.email}
                          onChange={handleChange}
                          placeholder="jason.ripper@effem.com"
                        />
                      </u>
                      {errors.email && <div style={{ color: 'red',fontSize:"13px" }}>{errors.email}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      PHONE
                    </label>
                    <div className="col-sm-8 ">
                      <div className="row">
                        <div className="col-3">
                          <select className="custom-font-lt form-control">
                            <option aria-placeholder={+91}>+91</option>
                            {phoneCode.map((phoneCode, index) => (
                              <option key={index} value={phoneCode}>
                                {phoneCode}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-9">
                          <input
                            type="text"
                            className="custom-font-lt form-control"
                            id="staticEmail"
                            name="phone"
                            value={eventFormData.phone}
                            onChange={handleChange}
                            placeholder="Insert Phone Number"

                          />
                          {errors.phone && <div style={{ color: 'red' ,fontSize:"13px"}}>{errors.phone}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT CO-HOST NAME <embed />
                      Optional
                      <embed />
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control"
                        id="staticEmail"
                        name="eventCoHost"
                        value={eventFormData.eventCoHost}
                        paceholder="Insert an name"
                        onChange={handleChange}

                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT CO-HOST EMAIL <embed />
                      Optional
                      <embed />
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control disabled"
                        id="staticEmail"
                        name="coHostEmail"
                        value={eventFormData.coHostEmail}
                        paceholder="Insert an email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                </div>
                <div className=" bg-light rounded p-3 mt-3">

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT DATE
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control"
                        id="staticEmail"
                        name="eventDate"
                        placeholder="Pick event dates"
                        value={eventFormData.eventDate}
                        onChange={handleChange}
                      />
                      {errors.eventDate && <div style={{ color: 'red',fontSize:"13px" }}>{errors.eventDate}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      IS THE EVENT DATE FLEXIBLE
                    </label>
                    <div className="col-sm-8 ">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="switch1"
                          name="isDateFlexible"
                          checked={eventFormData.isDateFlexible}
                          onChange={handleChange}

                        />
                      {errors.isDateFlexible && <div style={{ color: 'red',fontSize:"13px" }}>{errors.isDateFlexible}</div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" bg-light rounded p-3 mt-3">

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      AFFILIATED SITE CODE
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control"
                        id="staticSiteCode"
                        name="siteCode"
                        value={eventFormData.siteCode}
                        onChange={handleChange}
                        placeholder="Enter site Code"
                      />
                      {errors.siteCode && <div style={{ color: 'red',fontSize:"13px" }}>{errors.siteCode}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      <div className="vr-custom vr" /> PLEASE SPECIFY
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control"
                        id="staticEmail"
                        placeholder="Type something"
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      COUNTRY
                    </label>
                    <div className="col-sm-8 ">
                      <select
                        className="custom-font-lt form-control form-select form-select-sm"
                        aria-label="Small select example"
                        name="countryName"
                        value={eventFormData.countryName}
                        onChange={handleChange}
                      >
                         
                        <option value="" selected="selected" disabled="" hidden="">
                          Select a country
                        </option>
                        {country.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>

                    {errors.countryName && <div style={{ color: 'red',fontSize:"13px" }}>{errors.countryName}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      STATE
                    </label>
                    <div className="col-sm-8 ">
                      <div className="row">
                        <div className="col-sm-6">
                          <select
                            className="custom-font-lt form-control form-select form-select-sm"
                            aria-label="Small select example"
                            name="stateName"
                            value={eventFormData.stateName}
                            onChange={handleChange}
                          >
                            <option value="" selected="" disabled="" hidden="">
                              Select a state
                            </option>
                            {state.map((state, index) => (
                              <option key={index} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {errors.stateName && <div style={{ color: 'red',fontSize:"13px" }}>{errors.stateName}</div>}
                        </div>
                        <div className="col-sm-6">
                          <select
                            className="custom-font-lt form-control form-select form-select-sm"
                            aria-label="Small select example"
                            name="cityName"
                            value={eventFormData.cityName}
                            onChange={handleChange}
                          >
                            <option value="" selected="" disabled="" hidden="">
                              Select a city
                            </option>
                            {city.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          {errors.cityName && <div style={{ color: 'red',fontSize:"13px" }}>{errors.cityName}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT VENUE NAME
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control"
                        id="staticEmail"

                        name="eventVenueName"
                        value={eventFormData.eventVenueName}
                        onChange={handleChange}
                      />
                        {errors.eventVenueName && <div style={{ color: 'red',fontSize:"13px" }}>{errors.eventVenueName}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT VENUE ADDRESS
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        className="custom-font-lt form-control disabled"
                        id="staticEmail"
                        name="eventAddress"
                        value={eventFormData.eventAddress}
                        onChange={handleChange}
                      />
                        {errors.eventAddress && <div style={{ color: 'red',fontSize:"13px" }}>{errors.eventAddress}</div>}
                    </div>
                  </div>

                </div>
                <div className=" bg-light rounded p-3 mt-3">

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT TYPE
                    </label>
                    <div className="col-sm-8 ">
                      <select
                        className="custom-font-lt form-control form-select form-select-sm"
                        aria-label="Small select example"
                        name="eventType"
                        value={eventFormData.eventType}
                        onChange={handleChange}
                      >
                        <option value="">Select a Type</option>
                        {eventType.map((eventType, index) => (
                          <option key={index} value={eventType}>
                            {eventType}
                          </option>
                        ))}
                      </select>
                      {errors.eventType && <div style={{ color: 'red',fontSize:"13px" }}>{errors.eventType}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      EVENT FORMAT
                    </label>
                    <div className="col-sm-8 ">
                      <select
                        className="custom-font-lt form-control form-select form-select-sm"
                        aria-label="Small select example"
                        name="eventFormat"
                        value={eventFormData.eventFormat}
                        onChange={handleChange}
                      >
                        <option value="">Select a Format</option>
                        {eventFormat.map((eventFormat, index) => (
                          <option key={index} value={eventFormat}>
                            {eventFormat}
                          </option>
                        ))}

                      </select>
                      {errors.eventFormat && <div style={{ color: 'red',fontSize:"13px"}}>{errors.eventFormat}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      <div className="vr-custom vr" />
                      PLEASE SPECIFY
                    </label>
                    <div className="col-sm-8  ">
                      <input
                        readOnly=""
                        type="text"
                        className="custom-font-lt form-control disabled"
                        id="staticEmail"
                        name="nameOfMem"
                        value={eventFormData.nameOfMem}
                        onChange={handleChange}

                      />
                      {errors.nameOfMem && <div style={{ color: 'red',fontSize:"13px" }}>{errors.nameOfMem}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      LAST FAMILY MEMBER VISIT
                    </label>
                    <div className="col-sm-8 ">
                      <select
                        className="custom-font-lt form-control form-select form-select-sm"
                        aria-label="Small select example"
                        name="lastVisit"
                        value={eventFormData.lastVisit}
                        onChange={handleChange}
                      >
                     
                        <option value="">Select a Range</option>
                        {lastVisit.map((lastVisit, index) => (
                          <option key={index} value={lastVisit}>
                            {lastVisit}
                          </option>
                        ))}
                      </select>
                      {errors.lastVisit && <div style={{ color: 'red', fontSize:"13px" }}>{errors.lastVisit}</div>}
                    </div>
                  </div>

                </div>
                <div className=" bg-light rounded p-3 mt-3 mb-3">

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      ASSOCIATE(S) EXPECTED AT EVENT
                    </label>
                    <div className="col-sm-8">
                      <div className="form-check form-check-custom rounded">
                        <div className="p-3">
                          {associateAtEvent.map((associateAtEvent, index) => (
                            <div>
                              <label key={index} className="form-check-label-custom form-check-label">
                                <input type="checkbox" value={associateAtEvent} className="form-check-input" name="associateAtEvent" onChange={handleChange} />
                                {associateAtEvent}
                                {errors.associateAtEvent && <div style={{ color: 'red' ,fontSize:"13px"}}>{errors.associateAtEvent}</div>}
                              </label> <br /></div>
                              
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      ESTIMATED TOTAL NUMBER OF ATTENDEES
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        readOnly=""
                        type="text"
                        className="custom-font-lt form-control disabled"
                        id="staticEmail"
                        name="totalAttendees"
                        value={eventFormData.totalAttendees}
                        onChange={handleChange}

                      />
                      {errors.totalAttendees && <div style={{ color: 'red',fontSize:"13px" }}>{errors.totalAttendees}</div>}
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="staticEmail"
                      className="custom-font col-sm-4 col-form-label"
                    >
                      ESTIMATED MARS PETCARE ATTENDEES
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        readOnly=""
                        type="text"
                        className="custom-font-lt form-control disabled"
                        id="staticEmail"
                        name="estimatedMars"
                        placeholder="Type an estimation"

                      />
                  
                    </div>
                    
                  </div>
                

                </div>

              </form>
              </div>
              <div className="col-md-4 rounded">
                <MapComponent />
            </div>

            
          </div>
        </div>
        <Footer />
      </div>
    </div >
  );

}

export default Event;
