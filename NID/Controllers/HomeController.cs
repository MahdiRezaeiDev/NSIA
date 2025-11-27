using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Add this
using NID.Models;
using NID.Data;

namespace NID.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<HomeController> _logger;
        
        public HomeController(ApplicationDbContext context,  ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }
        
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        // For users to see only their own families
        [HttpGet]
        [HttpGet]
        public async Task<IActionResult> MyFamilies(string familyCode)
        {
            // Only search by family code
            var query = _context.Families.Include(f => f.Members).AsQueryable();
    
            if (!string.IsNullOrEmpty(familyCode))
            {
                // Exact match for family code
                query = query.Where(f => f.FamilyCode == familyCode.ToUpper());
            }
            else
            {
                // Return empty list if no search
                return View(new List<Family>());
            }

            var families = query.OrderByDescending(f => f.CreatedDate).ToList();
            return View(families);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            // Redirect to Error controller
            return RedirectToAction("Error", "Error");
        }
    }
}