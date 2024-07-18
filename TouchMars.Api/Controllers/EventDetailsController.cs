using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TouchMars.Api.Models;
using TouchMars.Domain.Models;
using TouchMars.Services.Interfaces;
using EnumExtensions = TouchMars.Domain.EnumExtensions;

namespace TouchMars.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventDetailsController : ControllerBase
    {
        private IEventDetailsService _eventDetailsService;
        private IGeoService _geoService;
        private readonly IMapper _mapper;
        public EventDetailsController(IEventDetailsService eventDetailsService, IMapper mapper, IGeoService geoService)
        {
            _eventDetailsService = eventDetailsService;
            _mapper = mapper;
            _geoService = geoService;
        }



        // GET: api/<EventDetails>
        [HttpGet("{id}")]
        public EventDetails Get(int id)
        {
            var eventDetails = _eventDetailsService.GetEventDetails(id);
            return _mapper.Map<EventDetails>(eventDetails.Result);
        }

        // GET: api/<EventDetails>
        [HttpGet]
        public List<EventDetails> GetAll()
        {
            List<EventDetails> eventDetails = new List<EventDetails>();
            var eventList = _eventDetailsService.GetAllEventDetails();
            foreach (var eve in eventList.Result)
            {
                var res = _mapper.Map<EventDetails>(eve);
                //var eve = eventList.Result[0];
                var loc = _geoService.GetLocation(eve.EventMaster.CountryID, eve.EventMaster.StateID, eve.EventMaster.CityID ?? 0);
                res.CountryName = loc.Result.Item1;
                res.StateName = loc.Result.Item2;
                res.CityName = loc.Result.Item3;
                res.RequestedBy = _eventDetailsService.getRequestedBy(eve.EventMaster.RequestedBy).Result;
                eventDetails.Add(res);

            }


            return eventDetails;
        }

        // POST api/<EventDetails>
        [HttpPost]
        public List<long> Post([FromBody] EventDetails eventDetails)
        {
            var result = new List<long>();
            try
            {
                var eventInfo = _mapper.Map<EventDetailsDto>(eventDetails);
                eventInfo.EventCoHost = (long)_eventDetailsService.getRequestedbyId(eventDetails.EventCoHost).Result;
                eventInfo.EventMaster.RequestedBy = (long)_eventDetailsService.getRequestedbyId(eventDetails.RequestedBy).Result;
                eventInfo.EventMaster.CountryID = (short)_geoService.GetCountryId(eventDetails.CountryName);
                eventInfo.EventMaster.StateID = (short)_geoService.GetStateId(eventDetails.StateName);
                eventInfo.EventMaster.CityID = (int)_geoService.GetCityId(eventDetails.CityName);
                if (eventDetails.Associates != null)
                {
                    eventInfo.Associates = "";
                    foreach (var a in eventDetails.Associates)
                    {
                        string del = "";
                        if (!eventInfo.Associates.Equals(""))
                        {
                            del = " , ";
                        }
                        eventInfo.Associates = eventInfo.Associates + del + a;
                    }
                }
               
                eventInfo.EventMaster.CreatedDate = DateTime.Now;
               
                eventInfo.EventMaster.EventStatus = "Draft";
                string strJson = JsonSerializer.Serialize<EventDetailsDto>(eventInfo);
                if (eventDetails.Id == 0)
                {
                    var res = _eventDetailsService.SaveEventDetails(eventInfo);
                    result.Add(res.Result.Item1);
                    result.Add(res.Result.Item2);
                    if (eventDetails.IsScheduleChange)
                    {
                        var schedule = _mapper.Map<ScheduleAndItineraryDto>(eventDetails.Schedule);
                        schedule.EventID = res.Result.Item2;
                        var scheduleRes = _eventDetailsService.SaveScheduleAndItinerary(schedule);
                    }
                    return result;
                }
                else
                {
                    eventInfo.EventMaster.ID = eventInfo.EventID;
                    var res = _eventDetailsService.EditEventDetails(eventInfo);
                    result.Add(res.Result.Item1);
                    result.Add(res.Result.Item2);
                    if (eventDetails.IsScheduleChange)
                    {
                        var schedule = _mapper.Map<ScheduleAndItineraryDto>(eventDetails.Schedule);
                        schedule.EventID = res.Result.Item2;
                        var scheduleRes = _eventDetailsService.UpdateScheduleAndItinerary(schedule);
                    }
                    return result;
                }
               

            }
            catch (Exception ex)
            {
                var e = ex;
                return result;
            }
        }

        
        [HttpGet]
        [Route("EventType")]
        public List<String> getEventType()
        {
            return EnumExtensions.GetEventType();
        }

        [HttpGet]
        [Route("EventFormat")]
        public List<String> getEventFormat()
        {
            return EnumExtensions.GetEventFormat();
        }

        [HttpGet]
        [Route("IntervalBetweenLastVisit")]
        public List<string> getIntervalBetweenLastVisit()
        {
            return EnumExtensions.GetTimeIntervalDisplay();
        }

        [HttpGet]
        [Route("AssociateAtEvent")]
        public List<String> getAssociateAtEvent()
        {
            return EnumExtensions.GetAssociateAtEvent();
        }

        [HttpGet]
        [Route("EventStatus")]
        public List<string> getEventStatus()
        {
            List<string> eventStatus = _eventDetailsService.GetEventStatus();
            return eventStatus;
        }
        [HttpDelete("{id}")]
        public async Task<int> deleteEvent(int id)
        {
            var res = await _eventDetailsService.DeleteEventDetails(id);
            return 1;
        }

    }
}
