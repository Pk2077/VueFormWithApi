using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewFormApi.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace NewFormApi.Controllers
{
    [Route("api/company")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly AppDb _context;

        public FormController(AppDb context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
                return NotFound();

            return Ok(company);
        }
        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _context.Companies.ToListAsync();

            if (companies == null)
                return NotFound();

            return Ok(companies);
        }
        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] Company company)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return Ok(company);
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateCompany([FromBody] Company company,int id)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var companyInDb = await _context.Companies.FindAsync(id);

            if(companyInDb == null)
                return BadRequest(ModelState);

            companyInDb.Name = company.Name;
            companyInDb.Code = company.Code;
            companyInDb.Contact = company.Contact;
            companyInDb.Phone = company.Phone;
            companyInDb.Add1 = company.Add1;
            companyInDb.Add2 = company.Add2;
            companyInDb.City = company.City;
            companyInDb.State = company.State;
            companyInDb.Pin = company.Pin;

            await _context.SaveChangesAsync();

            return Ok(companyInDb);
        }
        [HttpPost("remove/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
                return NotFound();

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(company);
        }

    }
}
