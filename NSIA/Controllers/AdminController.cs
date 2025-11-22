using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NSIA.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View("Dashboard");
        }

        public IActionResult Users()
        {
            return View();
        }

        public IActionResult Settings()
        {
            return View();
        }

    }
}
