using System.ComponentModel.DataAnnotations;
namespace NID.ViewModel;

public class EditFamilyRegistrationViewModel
{
    public int FamilyId { get; set; }

    [Required(ErrorMessage = "نام خانواده الزامی است")]
    public string FamilyName { get; set; }

    public int MainPersonId { get; set; }

    [Required(ErrorMessage = "نام الزامی است")]
    public string MainFirstName { get; set; }

    [Required(ErrorMessage = "نام خانوادگی الزامی است")]
    public string MainLastName { get; set; }

    [Required(ErrorMessage = "شماره تذکره الزامی است")]
    public string MainNationalId { get; set; }

    [Required(ErrorMessage = "تاریخ تولد الزامی است")]
    public DateTime MainBirthDate { get; set; }

    [Required(ErrorMessage = "جنسیت الزامی است")]
    public string MainGender { get; set; }

    // Optional in edit mode
    public IFormFile? MainPhotoFile { get; set; }
        
    public string? MainPhotoPath { get; set; }

    public List<EditFamilyMemberViewModel> Members { get; set; } = new();
}