using Microsoft.AspNetCore.Mvc;
using TouchMars.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class SiteVisitdetailsController : ControllerBase
{
    private readonly SiteVisitdetailsService _siteService;

    public SiteVisitdetailsController(SiteVisitdetailsService siteService)
    {
        _siteService = siteService;
    }

    [HttpGet("details")]
    public IActionResult GetSiteVisitDetails()
    {
        var eventDetails = _siteService.GetSiteDetailsWithCountry();
        return Ok(eventDetails);
    }

 

    [HttpGet("anniversarydetails")]
        public IActionResult GetAnniversary()
        {
           var eventDetail = _siteService.GetSiteAnniversaryDetails();
          
            return Ok(eventDetail);
        }

     [HttpGet("Visitcompletedfamilymemdetails")]
        public IActionResult GetVisitedfamilymemdetails()
        {
           var famDetails = _siteService.GetVisitedFamilymembersDetails();
          
            return Ok(famDetails);
        }

}
