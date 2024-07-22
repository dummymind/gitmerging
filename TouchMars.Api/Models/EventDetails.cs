using System.ComponentModel.DataAnnotations;

namespace TouchMars.Api.Models
{
    public class EventDetails
    {
        public long Id { get; set; }
        public long EventId { get; set; }
        [Required]
        public string EventTitle { get; set; } = string.Empty;

        public string AssociateSegment { get; set; } = string.Empty;

        public string CountryName { get; set; } = string.Empty;
        public string CityName { get; set; } = string.Empty;

        public string StateName { get; set; } = string.Empty;

        public string EventStatus { get; set; } = string.Empty;

        public string RequestedBy { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }

        [Required]
        public string? SiteCode { get; set; }
        public string? OtherSiteCode { get; set; }

        [Required]
        public string? LastVisit { get; set; }

        [Required]
        public DateTime EventDate { get; set; }

        [Required]
        public bool IsDateFlexible { get; set; }

        [Required]
        public string EventVenueName { get; set; } = string.Empty;

        [Required]
        public string EventAddress { get; set; } = string.Empty;


        [Required]
        public string EventType { get; set; } = string.Empty;

        [Required]
        public string EventFormat { get; set; }=string.Empty;

        public string? OtherFormat { get; set; }
        public string? EventCoHost { get; set; }
        public string? CoHostEmail { get; set; }

        [Required]
        public bool MaxFamilyNum { get; set; }
        public Int16 FamilyNum { get; set; }


        public bool SpecificFamilyMem { get; set; }
        public string NameOfMem { get; set; } = string.Empty;

        [Required]
        public Int16 TotalAttendees { get; set; }
        public List<string>? Associates { get; set; }
        public string? PetcareAttendess { get; set; }

        public EventSchedule Schedule { get; set; }

        public bool IsScheduleChange { get; set;}
    }
}
