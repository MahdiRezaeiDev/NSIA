using NID.Models;
using System.ComponentModel.DataAnnotations;

namespace NID.ViewModel;

public class CreateFamilyMemberViewModel
{
    [Required(ErrorMessage = "نام الزامی است")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "نام خانوادگی الزامی است")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "شماره تذکره الزامی است")]
    public string NationalId { get; set; }

    [Required(ErrorMessage = "تاریخ تولد الزامی است")]
    public DateTime BirthDate { get; set; }

    [Required(ErrorMessage = "جنسیت الزامی است")]
    public string Gender { get; set; }

    [Required(ErrorMessage = "نسبت الزامی است")]
    public FamilyRelationship Relationship { get; set; }

    [Required(ErrorMessage = "عکس تذکره الزامی است")]
    public IFormFile PhotoFile { get; set; }
}