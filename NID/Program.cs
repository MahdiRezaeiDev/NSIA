using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Diagnostics;
using NID.Data;
using NID.Models;
using NID.Seeders;
using NID.Services;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
           .EnableSensitiveDataLogging()
           .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services.AddScoped<FamilyPdfService>();
// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultUI()
    .AddDefaultTokenProviders();

// Configure file upload size
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10 MB
});

// Add MVC
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Middleware Configuration
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Enhanced Error Handling Middleware
app.UseStatusCodePagesWithReExecute("/Error/{0}");

// Custom 404 handling for unmatched routes
app.Use(async (context, next) =>
{
    await next();
    
    if (context.Response.StatusCode == 404 && !context.Response.HasStarted)
    {
        var originalPath = context.Request.Path;
        var originalQueryString = context.Request.QueryString;
        
        // Log the 404 error
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogWarning("404 Error: {OriginalPath}{QueryString}", originalPath, originalQueryString);
        
        context.Request.Path = "/Error/404";
        await next();
    }
});

// Routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

// Additional route for Error controller
app.MapControllerRoute(
    name: "error",
    pattern: "Error/{statusCode?}",
    defaults: new { controller = "Error", action = "HttpStatusCodeHandler" }
);

app.MapRazorPages();

// Seed default admin
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedDefaultAdmin.SeedAsync(services);
}

app.Run();