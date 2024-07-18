using TouchMars.Domain.Models;

namespace TouchMars.Services.Interfaces
{
    public interface IEventDetailsService
    {
        Task<EventDetailsDto> GetEventDetails(int id);
        Task<List<EventDetailsDto>> GetAllEventDetails();
        Task<(long,long)> SaveEventDetails(EventDetailsDto eventDetails);
        Task<(long, long)> EditEventDetails(EventDetailsDto eventDetails);
        Task<long> SaveScheduleAndItinerary(ScheduleAndItineraryDto scheduleAndItinerary);
        Task<long> UpdateScheduleAndItinerary(ScheduleAndItineraryDto scheduleAndItinerary);
        Task<int> DeleteEventDetails(int eventId);
        Task<long> getRequestedbyId(string? name);
        Task<string> getRequestedBy(long id);
        List<string> GetEventStatus();
    }
}
