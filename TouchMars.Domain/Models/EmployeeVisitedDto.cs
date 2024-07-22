using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace TouchMars.Domain.Models
{
    public class EmployeeVisitedDto
    {
      

        [ForeignKey("EventMaster")]
        public long EventID { get; set; }

        public  string FamilymemName{get; set;}
    }
}