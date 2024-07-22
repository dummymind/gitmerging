using TouchMars.Domain.Models;
using TouchMars.Infrastructure;
using TouchMars.Services.Interfaces;
using System.Linq;

public class SiteVisitdetailsService 
{
    private readonly TouchMarsDbContext _context;

    private readonly StaticDataService _staticDataService;

  

    public SiteVisitdetailsService(TouchMarsDbContext context,StaticDataService staticDataService)
    {
        _context = context;
        _staticDataService = staticDataService;
    }

    public IEnumerable<object> GetSiteDetailsWithCountry()
    {
       
        var eventDetails = _staticDataService.GetEventDetails();
        var eventMasters = _staticDataService.GetEventMasters();
        var countries = _staticDataService.GetCountries();

        var query = from ed in eventDetails
                    join em in eventMasters on ed.EventID equals em.ID
                    join c in countries on em.CountryID equals c.CountryID
                    select new
                    {
                        ed.SiteCode,
                        ed.LastVisit,
                        c.CountryName,
                        ed.FamilyNum

                    };

        return query.ToList();
    }

     public IEnumerable<object> GetSiteAnniversaryDetails()
    {
       
        var anniversaryDetails = _staticDataService.GetEventDetails();
        

        var query = from ed in anniversaryDetails
                    
                    select new
                    {
                        ed.SiteCode,
                        ed.EventDate

                    };

        return query.ToList();
    }

    public IEnumerable<object> GetVisitedFamilymembersDetails()
    {
       
        var eventDetails = _staticDataService.GetEventDetails();
       
        var fammembers = _staticDataService.GetFamilyvisiteddetails();

        var query = from ed in eventDetails                   
                    join c in fammembers on ed.EventID equals c.EventID
                     let eventDate = DateTime.Parse(ed.EventDate)
                    group ed by new { c.FamilymemName, Year = eventDate.Year } into g
                    select new
                    {
                        FamilyMemberName = g.Key.FamilymemName,
                        Year = g.Key.Year,
                        Count = g.Count()

                    };

        return query.ToList();
    }

    
}
