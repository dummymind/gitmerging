import React, { useState, useEffect } from 'react';
import axios from 'axios';
//const [eventFormData, seteventFormData] = useState({});

const handleSendForValidation = (event) => {
  event.preventDefault();

};

function handleNonEditable () {
  
  var form = document.getElementById("eventDetailsform");
var elements = form.elements;
for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
}
};

function handleDeleteDraft () {
  console.log('delete draft');
  
//   var form = document.getElementById("eventDetailsform");
// var elements = form.elements;
// for (var i = 0, len = elements.length; i < len; ++i) {
//     elements[i].value = "";
// }
const items = JSON.parse(localStorage.getItem('eventFormData'));
window.location.reload(false);
// if (items) {
//    if(items.eventId > 0)
//     {
//       axios.delete(`https://localhost:44311/api/EventDetails/`, { data: items.eventId  },{headers: { "Allow": "DELETE" }})
//       .then(response => {
//         console.log('Details deleted successfully: ', response.data);
//       })
//       .catch(error => {
//         console.error('Error deleting the details: ', error);
//         alert("Error updating the details");
//       });
//     }
//   }
  localStorage.setItem('eventFormData', JSON.stringify([]));
};

function handleSubmit()  {
  const eventFormData = JSON.parse(localStorage.getItem('eventFormData'));
  const errors = JSON.parse(localStorage.getItem('errors'));
    if (!eventFormData) {
    return;
  }
 
  eventFormData.eventStatus = "Draft";
 // eventFormData.id = eventId;
  let newErrors = {};

  // Basic validations
  if (!eventFormData.requestedBy) newErrors.requestedBy = 'Requested by is required';
  if (!eventFormData.eventTitle) newErrors.eventTitle = 'Event title is required';
  if (!eventFormData.associateSegment) newErrors.associateSegment = 'Associate segment is required';
  if (!eventFormData.email) newErrors.email = 'Email is required';
  if (!eventFormData.phone) newErrors.phone = 'Phone is required';
  if (!eventFormData.eventDate) newErrors.eventDate = 'Event date is required';
  if (!eventFormData.siteCode) newErrors.siteCode = 'Site code is required';
  if (!eventFormData.countryName) newErrors.countryName = 'Country name is required';
  if (!eventFormData.stateName) newErrors.stateName = 'State name is required';
  if (!eventFormData.cityName) newErrors.cityName = 'City name is required';
  if (!eventFormData.eventVenueName) newErrors.eventVenueName = 'Event venue name is required';
  if (!eventFormData.eventAddress) newErrors.eventAddress = 'Event address is required';
  if (!eventFormData.eventType) newErrors.eventType = 'Event type is required';
  if (!eventFormData.eventFormat) newErrors.eventFormat = 'Event format is required';
  if (!eventFormData.lastVisit) newErrors.lastVisit = 'LastVisit is required';
  if (!eventFormData.totalAttendees) newErrors.totalAttendees = 'Total attendees is required';
  //if (!eventFormData.estimatedMars) newErrors.estimatedMars = 'Estimated Mars is required';

  // Email validation
  const emailPattern = /^\S+@\S+\.\S+$/;
  if (eventFormData.email && !emailPattern.test(eventFormData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;
  if (eventFormData.phone && !phonePattern.test(eventFormData.phone)) {
    newErrors.phone = 'Please enter a valid phone number';
  }

  //setErrors(newErrors);
  localStorage.setItem('errors', JSON.stringify(newErrors));
  if (Object.keys(newErrors).length === 0) {
    // Proceed with form submission
      axios.post(`https://localhost:44311/api/EventDetails/`, eventFormData)
          .then(response => {
              console.log('Details updated successfully: ', response.data);
              //seteventId(response.data);
              eventFormData.id = response.data[0];
              eventFormData.eventId = response.data[1];
              // seteventFormData({ ...eventFormData, "id": response.data[0] });
              // seteventFormData({ ...eventFormData, "eventId": response.data[1] });
              eventFormData.IsScheduleChange=false;
              
              localStorage.setItem('eventFormData', JSON.stringify(eventFormData));
              localStorage.setItem('errors', JSON.stringify([]));
              alert("Details Updated");
          })
          .catch(error => {
              console.error('Error updating the details: ', error);
              alert("Error updating the details");
          });
  }
};

export default function Footer() {
    return     (<footer className="footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <button type="button" className="btn btn-outline-light left-button">
            Back
          </button>
        </div>
        <div className="col-md-6 text-end">
          <button type="button" className="btn btn-outline-light right-buttons" onClick={handleDeleteDraft}>
            DELETE DRAFT
          </button>
          <button type="button" className="btn btn-outline-light right-buttons" onClick={handleNonEditable}>
            CLOSE EDITOR MODE
          </button>
          <button   className="btn btn-outline-light right-buttons" onClick={handleSubmit}>
            SAVE CHANGES
          </button>
          <button type="button" className="btn btn-outline-light right-buttons" onclick={handleSendForValidation}>
            SEND FOR VALIDATION
          </button>
        </div>
      </div>
    </div>
  </footer>
  );

}