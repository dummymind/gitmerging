using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouchMars.Domain.Models;
using TouchMars.Infrastructure;
using TouchMars.Services.Interfaces;

namespace TouchMars.Services
{
    public class EventDetailsService : IEventDetailsService
    {
        private readonly TouchMarsDbContext _touchMarsDbContext;
        public EventDetailsService(TouchMarsDbContext touchMarsDbContext)
        {
            _touchMarsDbContext = touchMarsDbContext;
        }
        public async Task<EventDetailsDto> GetEventDetails(int id)
        {
            var eventDetails = await _touchMarsDbContext.EventDetail.Include(x => x.EventMaster)
                .Where(x => x.EventID == id).FirstOrDefaultAsync();
            return eventDetails;
        }

        public async Task<int> DeleteEventDetails(int eventId)
        {
            var eventDetails = await _touchMarsDbContext.EventDetail.Include(x => x.EventMaster)
                .Where(x => x.EventID == eventId).FirstOrDefaultAsync();
            var eventMaster = await _touchMarsDbContext.EventMaster.FindAsync((long)eventId);
            if (eventDetails == null || eventMaster == null)
            {
                return 0;
            }
            _touchMarsDbContext.EventDetail.Remove(eventDetails);
            _touchMarsDbContext.EventMaster.Remove(eventMaster);
            await _touchMarsDbContext.SaveChangesAsync();
            return 1;
        }

        public async Task<List<EventDetailsDto>> GetAllEventDetails()
        {
            var eventDetails = await _touchMarsDbContext.EventDetail.Include(x => x.EventMaster).Select(y => y).ToListAsync();
            return eventDetails;
        }

        public async Task<(long,long)> SaveEventDetails(EventDetailsDto eventDetails)
        {
            _touchMarsDbContext.EventDetail.Add(eventDetails);
            var res = await _touchMarsDbContext.SaveChangesAsync();
            //var log = _touchMarsDbContext.Database.CommitTransactionAsync();
            return (eventDetails.ID, eventDetails.EventID);
        }

        public async Task<long> SaveScheduleAndItinerary(ScheduleAndItineraryDto scheduleAndItinerary)
        {
            _touchMarsDbContext.EventSchedule.Add(scheduleAndItinerary);
            var res = await _touchMarsDbContext.SaveChangesAsync();
            //var log = _touchMarsDbContext.Database.CommitTransactionAsync();
            return res;

        }

        public async Task<long> UpdateScheduleAndItinerary(ScheduleAndItineraryDto scheduleAndItinerary)
        {
            _touchMarsDbContext.EventSchedule.Update(scheduleAndItinerary);
            var res = await _touchMarsDbContext.SaveChangesAsync();
            return res;
        }
        public async Task<(long,long)> EditEventDetails(EventDetailsDto eventDetails)
        {
            _touchMarsDbContext.EventDetail.Update(eventDetails);
            var res = await _touchMarsDbContext.SaveChangesAsync();
            //var log = _touchMarsDbContext.Database.CommitTransactionAsync();
            return (eventDetails.ID, eventDetails.EventID);
        }

        public async Task<long> getRequestedbyId(string? name)
        {
            if (name == null)
                return 0;
            var username = name.Split(' ');
            var user = await _touchMarsDbContext.Users.Where(x => x.FirstName == username[0] && x.LastName == username[1]).Select(x => x.ID).FirstOrDefaultAsync();
            return user;
        }
        public async Task<string> getRequestedBy(long id)
        {

            var user = await _touchMarsDbContext.Users.Where(x => x.ID == id).Select(x => x).FirstOrDefaultAsync();
            return user.FirstName + " " + user.LastName;
        }

        public List<string> GetEventStatus()
        {
            var eventStatus =  _touchMarsDbContext.EventStatus.Select(x => x.Status).ToList();
            return eventStatus;
        }
    }
}
