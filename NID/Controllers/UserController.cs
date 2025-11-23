using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NID.Models;
using NID.ViewModel;

namespace NID.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // ----------------------------
        // List all users
        // ----------------------------
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var users = _userManager.Users.ToList();
            var model = new List<UserListViewModel>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                model.Add(new UserListViewModel
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Role = roles.FirstOrDefault() ?? "User" // display the first role or default
                });
            }

            return View(model);
        }

        // ----------------------------
        // Show create user form
        // ----------------------------
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // ----------------------------
        // Handle create user POST
        // ----------------------------
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Ensure the role exists
                if (!await _roleManager.RoleExistsAsync(model.Role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(model.Role));
                }

                // Assign role
                await _userManager.AddToRoleAsync(user, model.Role);

                TempData["SuccessMessage"] = "کاربر با موفقیت ایجاد شد!";
                return RedirectToAction("Index");
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError("", TranslateIdentityError(error));

            TempData["ErrorMessage"] = "خطا در ایجاد کاربر!";
            return View(model);
        }

        // ----------------------------
        // Show edit user form
        // ----------------------------
        [HttpGet]
        public async Task<IActionResult> Edit(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            var roles = await _userManager.GetRolesAsync(user);

            var model = new EditUserViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = roles.FirstOrDefault() ?? "User"
            };

            return View(model);
        }

        // ----------------------------
        // Handle edit user POST
        // ----------------------------
        [HttpPost]
        public async Task<IActionResult> Edit(EditUserViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null) return NotFound();

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.UserName = model.Email;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                // Update password if provided
                if (!string.IsNullOrWhiteSpace(model.Password))
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var pwdResult = await _userManager.ResetPasswordAsync(user, token, model.Password);
                    if (!pwdResult.Succeeded)
                    {
                        foreach (var error in pwdResult.Errors)
                            ModelState.AddModelError("", TranslateIdentityError(error));
                        TempData["ErrorMessage"] = "خطا در تغییر رمز عبور!";
                        return View(model);
                    }
                }

                // Update role
                var currentRoles = await _userManager.GetRolesAsync(user);
                if (!currentRoles.Contains(model.Role))
                {
                    // Remove old roles
                    await _userManager.RemoveFromRolesAsync(user, currentRoles);
                    // Ensure role exists
                    if (!await _roleManager.RoleExistsAsync(model.Role))
                        await _roleManager.CreateAsync(new IdentityRole(model.Role));

                    await _userManager.AddToRoleAsync(user, model.Role);
                }

                TempData["SuccessMessage"] = "کاربر با موفقیت ویرایش شد!";
                return RedirectToAction("Index");
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError("", TranslateIdentityError(error));

            TempData["ErrorMessage"] = "خطا در ویرایش کاربر!";
            return View(model);
        }

        // ----------------------------
        // Delete user
        // ----------------------------
        [HttpGet]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                TempData["ErrorMessage"] = "کاربر پیدا نشد!";
                return RedirectToAction("Index");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                TempData["ErrorMessage"] = "خطا در حذف کاربر!";
                return RedirectToAction("Index");
            }

            TempData["SuccessMessage"] = "کاربر با موفقیت حذف شد!";
            return RedirectToAction("Index");
        }

        // ----------------------------
        // Translate Identity errors to Persian
        // ----------------------------
        private string TranslateIdentityError(IdentityError error)
        {
            return error.Code switch
            {
                "DuplicateUserName" => "این ایمیل قبلاً ثبت شده است.",
                "DuplicateEmail" => "این ایمیل قبلاً استفاده شده است.",
                "PasswordTooShort" => "رمز عبور خیلی کوتاه است.",
                "PasswordRequiresNonAlphanumeric" => "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد.",
                "PasswordRequiresDigit" => "رمز عبور باید شامل حداقل یک عدد باشد.",
                "PasswordRequiresUpper" => "رمز عبور باید شامل حداقل یک حرف بزرگ باشد.",
                "PasswordRequiresLower" => "رمز عبور باید شامل حداقل یک حرف کوچک باشد.",
                _ => error.Description
            };
        }
    }
}
