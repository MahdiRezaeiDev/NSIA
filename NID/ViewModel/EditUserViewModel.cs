using System.ComponentModel.DataAnnotations;

namespace NID.ViewModel
{
    public class EditUserViewModel
    {
        public required string Id { get; set; }

        [Required(ErrorMessage = "وارد کردن نام الزامی است")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "وارد کردن نام خانوادگی الزامی است")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "وارد کردن ایمیل الزامی است")]
        [EmailAddress(ErrorMessage = "ایمیل معتبر وارد کنید")]
        public string Email { get; set; } = string.Empty;

        [DataType(DataType.Password)]
        [Display(Name = "رمز عبور جدید")]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "رمز عبور و تایید آن مطابقت ندارند")]
        [Display(Name = "تایید رمز عبور جدید")]
        public string? ConfirmPassword { get; set; }

        [Required(ErrorMessage = "انتخاب نقش الزامی است")]
        public string Role { get; set; } = "User";
    }
}
