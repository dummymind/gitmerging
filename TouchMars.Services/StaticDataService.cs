using TouchMars.Domain.Models;

public class StaticDataService
{
    public IEnumerable<EventDetailsDto> GetEventDetails()
    {
        return new List<EventDetailsDto>
        {
            new EventDetailsDto
            {
                ID = 1,
                EventID = 1,
                SiteCode = "SC001",
                LastVisit="14 June 2023",
                 EventDate = "14 June 2025",
                IsDateFlexible = false,
                EventVenueName = "Venue 1",
                EventAddress = "Address 1",
                EventType = "Type 1",
                EventFormat = "Format 1",
                MaxFamilyNum = true,
                FamilyNum = 4,
                SpecificFamilyMem = true,
                NameOfMem = "John Doe",
                TotalAttendees = 100      
            },
            new EventDetailsDto
            {
                ID = 2,
                EventID = 2,
                SiteCode = "SC002",
                LastVisit="14 June 2024",
                 EventDate ="14 June 2024",
                IsDateFlexible = false,
                EventVenueName = "Venue 1",
                EventAddress = "Address 1",
                EventType = "Type 1",
                EventFormat = "Format 1",
                MaxFamilyNum = true,
                FamilyNum = 4,
                SpecificFamilyMem = true,
                NameOfMem = "John Do",
                TotalAttendees = 1222     
            },

            new EventDetailsDto
            {
                ID = 3,
                EventID = 3,
                SiteCode = "SC003",
                LastVisit="14 June 2023",
                EventDate = "14 June 2026",
                IsDateFlexible = false,
                EventVenueName = "Venue 1",
                EventAddress = "Address 1",
                EventType = "Type 1",
                EventFormat = "Format 1",
                MaxFamilyNum = true,
                FamilyNum = 45,
                SpecificFamilyMem = true,
                NameOfMem = "Jo Doe",
                TotalAttendees = 10068      
            },

            new EventDetailsDto
            {
                ID = 4,
                EventID = 4,
                SiteCode = "SC004",
                LastVisit="14 June 2023",
                 EventDate = "14 June 2023",
                IsDateFlexible = false,
                EventVenueName = "Venue 1",
                EventAddress = "Address 1",
                EventType = "Type 1",
                EventFormat = "Format 1",
                MaxFamilyNum = true,
                FamilyNum = 45,
                SpecificFamilyMem = true,
                NameOfMem = "Jo Doe",
                TotalAttendees = 10068      
            },

            new EventDetailsDto
            {
                ID = 5,
                EventID = 5,
                SiteCode = "SC005",
                LastVisit="14 June 2023",
                EventDate = "14 June 2025",
                IsDateFlexible = false,
                EventVenueName = "Venue 1",
                EventAddress = "Address 1",
                EventType = "Type 1",
                EventFormat = "Format 1",
                MaxFamilyNum = true,
                FamilyNum = 45,
                SpecificFamilyMem = true,
                NameOfMem = "Jo Doe",
                TotalAttendees = 10068      
            },
            
            
            
            
        };
    }

    public IEnumerable<EventMasterDto> GetEventMasters()
    {
        return new List<EventMasterDto>
        {
            new EventMasterDto
            {
                ID = 1,
                EventTitle = "Event 1",
                CountryID = 1,
                StateID = 1,
                CityID = 1,
                EventStatus = "Active",
                RequestedBy = 1,
                Email = "email1@example.com",
                Phone = "1234567890",
                CreatedDate = DateTime.Now
            },
            new EventMasterDto
            {
                ID = 2,
                EventTitle = "Event 2",
                CountryID = 2,
                StateID = 1,
                CityID = 1,
                EventStatus = "Active",
                RequestedBy = 1,
                Email = "email1@example.com",
                Phone = "1234567890",
                CreatedDate = DateTime.Now
            },
            new EventMasterDto
            {
                ID = 3,
                EventTitle = "Event 3",
                CountryID =3,
                StateID = 1,
                CityID = 1,
                EventStatus = "Active",
                RequestedBy = 1,
                Email = "email1@example.com",
                Phone = "1234567890",
                CreatedDate = DateTime.Now
            },
            new EventMasterDto
            {
                ID = 4,
                EventTitle = "Event 4",
                CountryID =4,
                StateID = 1,
                CityID = 1,
                EventStatus = "Active",
                RequestedBy = 1,
                Email = "email1@example.com",
                Phone = "1234567890",
                CreatedDate = DateTime.Now
            },
            new EventMasterDto
            {
                ID = 5,
                EventTitle = "Event 5",
                CountryID =5,
                StateID = 1,
                CityID = 1,
                EventStatus = "Active",
                RequestedBy = 1,
                Email = "email1@example.com",
                Phone = "1234567890",
                CreatedDate = DateTime.Now
            },
            
        };
    }

    public IEnumerable<CountryDto> GetCountries()
    {
        return new List<CountryDto>
        {
            new CountryDto
            {
                CountryID = 1,
                CountryName = "Country 1",
                CountryCode = "C1",
                PhoneCode = 1
            },
            new CountryDto
            {
                CountryID = 2,
                CountryName = "Country 3",
                CountryCode = "C2",
                PhoneCode = 1
            },
            new CountryDto
            {
                CountryID = 3,
                CountryName = "Country 3",
                CountryCode = "C3",
                PhoneCode = 1
            },
            new CountryDto
            {
                CountryID = 4,
                CountryName = "Country 4",
                CountryCode = "C3",
                PhoneCode = 1
            },
            new CountryDto
            {
                CountryID = 5,
                CountryName = "Country 5",
                CountryCode = "C3",
                PhoneCode = 1
            },
           
        };
    }

    public IEnumerable<EmployeeVisitedDto> GetFamilyvisiteddetails()
    {
        return new List<EmployeeVisitedDto>
        {
            new EmployeeVisitedDto
            {
                EventID = 1,
                FamilymemName="Andreia"
                
            },
            new EmployeeVisitedDto
            {
                EventID = 2,
                FamilymemName="Puff"
                
            },
           new EmployeeVisitedDto
            {
                EventID = 3,
                FamilymemName="Andreia"
                
            },
            new EmployeeVisitedDto
            {
                EventID = 4,
                FamilymemName="YOU"
                
            },
            new EmployeeVisitedDto
            {
                EventID = 5,
                FamilymemName="Andreia"
                
            },

             new EmployeeVisitedDto
            {
                EventID = 5,
                FamilymemName="Kalki"
                
            },
              new EmployeeVisitedDto
            {
                EventID = 2,
                FamilymemName="Luke"
                
            },
              new EmployeeVisitedDto
            {
                EventID = 1,
                FamilymemName="Ashwathama"
                
            },
              new EmployeeVisitedDto
            {
                EventID = 3,
                FamilymemName="Yaskin"
                
            },


           
        };
    }
}
