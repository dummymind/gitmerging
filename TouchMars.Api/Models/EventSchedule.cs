namespace TouchMars.Api.Models
{
    public class EventSchedule
    {
        public long EventID { get; set; }
        public string? VisitSummary { get; set; }
        public string? DraftItinerary { get; set; }
        public string? DocumentLink { get; set; }
    }
}
