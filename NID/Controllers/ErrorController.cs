using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace NID.Controllers
{
    public class ErrorController : Controller
    {
        private readonly ILogger<ErrorController> _logger;

        public ErrorController(ILogger<ErrorController> logger)
        {
            _logger = logger;
        }

        [Route("Error/{statusCode}")]
        public IActionResult HttpStatusCodeHandler(int statusCode)
        {
            var statusCodeResult = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

            switch (statusCode)
            {
                case 404:
                    ViewBag.ErrorMessage = "صفحه مورد نظر یافت نشد";
                    ViewBag.OriginalPath = statusCodeResult?.OriginalPath;
                    ViewBag.OriginalQueryString = statusCodeResult?.OriginalQueryString;
                    
                    _logger.LogWarning(
                        "404 Error Occured. Path: {OriginalPath} and QueryString: {QueryString}",
                        statusCodeResult?.OriginalPath,
                        statusCodeResult?.OriginalQueryString);
                    return View("NotFound");
                
                case 500:
                    ViewBag.ErrorMessage = "خطای داخلی سرور";
                    return View("InternalServerError");
                
                case 403:
                    ViewBag.ErrorMessage = "دسترسی غیرمجاز";
                    return View("AccessDenied");
                
                default:
                    ViewBag.ErrorMessage = "خطای ناشناخته";
                    return View("Error");
            }
        }

        [Route("Error")]
        public IActionResult Error()
        {
            var exceptionHandlerPathFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            
            _logger.LogError(
                "Unhandled exception occurred: {Error} at path: {Path}",
                exceptionHandlerPathFeature?.Error?.Message,
                exceptionHandlerPathFeature?.Path);

            ViewBag.ErrorMessage = "متأسفانه خطایی در سیستم رخ داده است";
            ViewBag.Path = exceptionHandlerPathFeature?.Path;
            ViewBag.StackTrace = exceptionHandlerPathFeature?.Error?.StackTrace;

            return View("Error");
        }

        [Route("AccessDenied")]
        public IActionResult AccessDenied()
        {
            return View("AccessDenied");
        }
    }
}