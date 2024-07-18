import { createContext, useState, useEffect } from "react";
import axios from 'axios';
const FormContext = createContext({});
export const FormProvider = ({ children }) => {

    const title = {
        0: 'Event',
        1: 'Schedule',
        2: 'Guests',
        3: 'History',
        4: 'Summary'
    }

    const [page, setPage] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [errors, setErrors] = useState({})
    const [eventTypeList, setEventTypes] = useState([])
    const [eventFormatList, setEventFormat] = useState([])
    const [lastVisitList, setlastVisit] = useState([])
    const [associateAtEvent, setassociateAtEvent] = useState([])
    const [phoneCode, setphoneCode] = useState([])
    const [country, setcountry] = useState([])
    const [state, setstate] = useState([])
    const [city, setcity] = useState([])


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
        schedule: {
            visitSummary: '',
            draftItinerary: ''
        },
        maxFamilyNum: false,
        familyNum: 0,
        specificFamilyMem: false,
        nameOfMem: '',
        IsScheduleChange: false,
        lastVisit: '',
        associateAtEvent:'',
    });
    const {
        requestedBy,
        eventTitle,
        associateSegment,
        email,
        phone,
        eventDate,
        siteCode,
        countryName,
        stateName,
        cityName,
        eventVenueName,
        eventAddress,
        eventType,
        eventFormat,
        totalAttendees,
        lastVisit,
        ...requiredInputs } = eventFormData

    const handleChange = e => {
        const type = e.target.type

        const name = e.target.name

        var value =  e.target.value

      //  const { fname, value , checked } = e.target;

  let errorMessage = '';

  // Perform validation for each field
  if (name === 'requestedBy' && value.trim() === '') {
    errorMessage = 'Requested by is required';
  } else if (name === 'eventTitle' && value.trim() === '') {
    errorMessage = 'Event title is required';
  } else if (name === 'associateSegment' && value.trim() === '') {
    errorMessage = 'Associate segment is required';
  } else if (name === 'email' && value.trim() === '') {
    errorMessage = 'Email is required';
  } else if (name === 'phone' && value.trim() === '') {
    errorMessage = 'Phone is required';
  } else if (name === 'eventDate' && value.trim() === '') {
    errorMessage = 'Event date is required';
  } else if (name === 'siteCode' && value.trim() === '') {
    errorMessage = 'Site code is required';
  } else if (name === 'countryName' && value.trim() === '') {
    errorMessage = 'Country name is required';
  } else if (name === 'stateName' && value.trim() === '') {
    errorMessage = 'State name is required';
  } else if (name === 'cityName' && value.trim() === '') {
    errorMessage = 'City name is required';
  } else if (name === 'eventVenueName' && value.trim() === '') {
    errorMessage = 'Event venue name is required';
  } else if (name === 'eventAddress' && value.trim() === '') {
    errorMessage = 'Event address is required';
  } else if (name === 'eventType' && value.trim() === '') {
    errorMessage = 'Event type is required';
  } else if (name === 'eventFormat' && value.trim() === '') {
    errorMessage = 'Event format is required';
  } else if (name === 'totalAttendees' && value.trim() === '') {
    errorMessage = 'Total attendees is required';
  } else if (name === 'email' && !(/^\S+@\S+\.\S+$/.test(value))) {
    errorMessage = 'Please enter a valid email address';
  } else if (name === 'phone' && !(/^[0-9]{10}$/.test(value))) {
    errorMessage = 'Please enter a valid phone number';
  } else if (name === 'lastVisit' && value.trim() === '') {
    errorMessage = 'Please select a range for last visit';
  } 

  // } else if (name === 'estimatedMars' && value.trim() === '') {
  //   errorMessage = 'Please select a range for estimated mars';
  // }

  setErrors({ ...errors, [name]: errorMessage });

            if (name == "eventType" || name == "eventFormat" || name == "lastVisit" || name == "cityName" ) {
              value= e.target.options[e.target.selectedIndex].text 
                    
                  }
                  else if(name == "countryName")
                  {
                    value = e.target.options[e.target.selectedIndex].text 
                   
                     // useEffect(() => {
                        fetchState(e.target.options[e.target.selectedIndex].text);
                      //}, []); 
                  }
                  else if(name == "stateName")
                    {
                      value= e.target.options[e.target.selectedIndex].text 
                    //  useEffect(() => {
                        fetchCity(e.target.options[e.target.selectedIndex].text);
                    //  }, []); 
                    } else if (name === 'associateAtEvent') {
                      if (e.target.checked) {
                        setSelectedOptions([...selectedOptions, { value: e.target.value }]);
                      }
                      else {
                        setSelectedOptions(selectedOptions.filter(item => item.value !== e.target.value));
                
                      }
                      value = selectedOptions.map(x => x.value) 
                    
                  } else if(name === 'isDateFlexible')
                    {
                      value= e.target.checked
                      
                    } 
                    else if(name === 'maxFamilyNum')
                      {
                        value= e.target.checked
                        e.target.checked
                          ?document.getElementById("familyNum").hidden=false
                          :document.getElementById("familyNum").hidden=true;
                        
                        
                      } 
                      else if(name === 'specificFamilyMem')
                        {
                          value= e.target.checked
                          e.target.checked
                          ?document.getElementById("nameOfMem").hidden=false
                          :document.getElementById("nameOfMem").hidden=true;
                          
                        } 
                        else if(name === 'isDateFlexible')
                          {
                            value= e.target.checked
                           
                            
                          } 
                  else {
                    value= e.target.value
                    
                    }
                    setEventFormData(prevData => ({
                        ...prevData,
                        [name]: value
                    }))

      console.log(eventFormData);   
      console.log(value);   

    }
    const handleScheduleAgendaChange = (e) => {
      eventFormData.schedule.visitSummary = e;
      eventFormData.IsScheduleChange = true;
  
    };
    const handleScheduleItenaryChange = (e) => {
      eventFormData.schedule.draftItinerary = e;
      eventFormData.IsScheduleChange = true;
  
    };

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
          const response = await axios.get('https://localhost:44311/State/' + countryName);
          console.log("Resonse of EventType is", response);
          setstate(response.data);
        } catch (error) {
          console.error('Error fetching event types:', error);
        }
      };
      const fetchCity = async (stateName) => {
        try {
          const responseCity = await axios.get('https://localhost:44311/City/' + stateName);
          console.log("Resonse of EventType is", responseCity);
          setcity(responseCity.data);
        } catch (error) {
          console.error('Error fetching event types:', error);
        }
      };

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    const handlepageChange = (val) => {
       
        setPage(val);
        console.log(page);
    }

    function handleSubmit()  {

  
      eventFormData.eventStatus = "Draft";
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
      if (eventFormData.maxFamilyNum && eventFormData.familyNum === 0) {
        newErrors.familyNum = 'Please specify the maximum family number';
      } 
      if (nameOfMem === 'familyNum' && eventFormData.specificFamilyMem && eventFormData.nameOfMem === '') {
        newErrors.nameOfMem = 'Please specify the maximum family number';
      }
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
    
      setErrors(newErrors);
    
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
                  
                 
                  alert("Details Updated");
              })
              .catch(error => {
                  console.error('Error updating the details: ', error);
                  alert("Error updating the details");
              });
      }
    };


    return (
        <FormContext.Provider value={{ title, page, setPage, eventFormData, setEventFormData, canSubmit,
           handleChange ,handlepageChange,setErrors,errors,fetchEventTypes,fetchEventFormat,fetchLastVisit,
           fetchAssociateAtEvent,fetchPhonecode,fetchCountry,fetchState,fetchCity,eventTypeList,eventFormatList,
           lastVisitList,associateAtEvent,phoneCode,country,state,city,
           handleScheduleAgendaChange,handleScheduleItenaryChange,handleSubmit}}>
            {children}
        </FormContext.Provider>
    )
}
export default FormContext 