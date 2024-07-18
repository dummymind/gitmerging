using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TouchMars.Domain.Models
{
    
    public class ScheduleAndItineraryDto
    {
        [Key]
        public long EventID { get; set; }
        public string? VisitSummary { get; set; }
        public string? DraftItinerary { get; set; }
        public string? DocumentLink { get; set; }
    }
}
