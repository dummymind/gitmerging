using System.ComponentModel.DataAnnotations;
using TouchMars.Domain.Models;

namespace TouchMars.Api.Models
{
    public class Country
    {
       public int CountryID{ get; set; } 

       
        public string CountryName { get; set; } = string.Empty;

       
    }

}