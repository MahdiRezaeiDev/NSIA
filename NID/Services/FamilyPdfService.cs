using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using NID.Models;
using System.Globalization;

namespace NID.Services
{
    public class FamilyPdfService
    {
        private readonly IWebHostEnvironment _environment;

        public FamilyPdfService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public byte[] GenerateFamilyPdf(Family family)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(1.5f, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(11).FontFamily("Yekan"));

                    page.Header().Element(c => ComposeHeader(c, family));
                    page.Content().Element(container => ComposeContent(container, family));
                    // Remove default footer
                });
            })
            .GeneratePdf();
        }

        private void ComposeHeader(IContainer container, Family family)
        {
            container.Column(column =>
            {
                // Main header row
                column.Item().Row(row =>
                {
                    // Logo on the right
                    row.ConstantItem(80).Height(70).AlignRight().Element(logoContainer =>
                    {
                        var logoPath = Path.Combine(_environment.WebRootPath, "images", "logo.png");
                        if (File.Exists(logoPath))
                        {
                            logoContainer.Image(File.ReadAllBytes(logoPath));
                        }
                        else
                        {
                            logoContainer.Width(60).Height(60).Placeholder("لوگو");
                        }
                    });

                    // Organization info in center
                    row.RelativeItem().AlignCenter().Column(orgColumn =>
                    {
                        orgColumn.Item().Text("جمهوری اسلامی افغانستان")
                            .SemiBold().FontSize(14).FontColor(Colors.Blue.Darken3);

                        orgColumn.Item().Text("اداره ملی احصائیه و معلومات")
                            .SemiBold().FontSize(16).FontColor(Colors.Blue.Darken4);

                        orgColumn.Item().Text("سیستم تذکره الکترونیکی")
                            .FontSize(12).FontColor(Colors.Grey.Darken2);
                    });

                    // Report info on the left
                    row.ConstantItem(120).AlignLeft().Column(infoColumn =>
                    {
                        infoColumn.Item().Text("گزارش اطلاعات خانواده")
                            .SemiBold().FontSize(12).FontColor(Colors.Blue.Medium);

                        infoColumn.Item().Text(DateTime.Now.ToString("yyyy/MM/dd", new CultureInfo("fa-IR")))
                            .FontSize(10).FontColor(Colors.Grey.Medium);
                    });
                });

                // Separator line
                column.Item().PaddingTop(5).LineHorizontal(1).LineColor(Colors.Grey.Lighten1);
            });
        }

        private void ComposeContent(IContainer container, Family family)
        {
            container.PaddingVertical(10).Column(column =>
            {
                // Family Information Section
                column.Item().Element(c => ComposeFamilyInfo(c, family));
                column.Item().PaddingTop(25);

                // Members Section
                column.Item().Element(c => ComposeMembersInfo(c, family));

                // Custom Footer
                column.Item().PaddingTop(30).Element(ComposeCustomFooter);
            });
        }

        private void ComposeFamilyInfo(IContainer container, Family family)
        {
            container.Border(1).BorderColor(Colors.Grey.Lighten2).Padding(15).Column(column =>
            {
                column.Item().AlignCenter().Text("مشخصات عمومی خانواده")
                    .SemiBold().FontSize(16).FontColor(Colors.Blue.Darken3);

                column.Item().PaddingTop(15).Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn();    // Value
                        columns.ConstantColumn(120); // Label
                        columns.RelativeColumn();    // Value
                        columns.ConstantColumn(120); // Label
                    });

                    // Row 1
                    table.Cell().AlignRight().PaddingVertical(8).Text(family.FamilyName).FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text("نام فامیل:").SemiBold().FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text(family.FamilyCode).FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text("کود فامیل:").SemiBold().FontSize(11);

                    // Row 2
                    table.Cell().AlignRight().PaddingVertical(8).Text(family.Members?.Count.ToString() ?? "0").FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text("تعداد اعضا:").SemiBold().FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text(family.CreatedDate.ToString("yyyy/MM/dd", new CultureInfo("fa-IR"))).FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text("تاریخ ثبت:").SemiBold().FontSize(11);

                    // Row 3 - Additional family info if available
                    table.Cell().AlignRight().PaddingVertical(8).Text(family.UpdatedDate.ToString("yyyy/MM/dd", new CultureInfo("fa-IR"))).FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text("آخرین更新:").SemiBold().FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text(GetFamilyStatus(family)).FontSize(11);
                    table.Cell().AlignRight().PaddingVertical(8).Text("وضعیت:").SemiBold().FontSize(11);
                });
            });
        }

        private void ComposeMembersInfo(IContainer container, Family family)
        {
            container.Column(column =>
            {
                column.Item().PaddingBottom(15).AlignCenter().Text("مشخصات تفصیلی اعضای فامیل")
                    .SemiBold().FontSize(16).FontColor(Colors.Blue.Darken3);

                if (family.Members?.Any() == true)
                {
                    var sortedMembers = family.Members.OrderBy(m => m.Relationship switch
                    {
                        FamilyRelationship.Self => 0,
                        FamilyRelationship.Husband => 1,
                        FamilyRelationship.Wife => 2,
                        FamilyRelationship.Son => 3,
                        FamilyRelationship.Daughter => 4,
                        FamilyRelationship.Other => 5,
                        _ => 6
                    }).ThenBy(m => m.BirthDate);

                    int memberNumber = 1;
                    foreach (var member in sortedMembers)
                    {
                        column.Item().PaddingBottom(20).Border(1).BorderColor(Colors.Grey.Lighten2)
                            .Background(Colors.Grey.Lighten5)
                            .Padding(20).Column(memberColumn =>
                            {
                                // Member Header with Number
                                memberColumn.Item().PaddingBottom(15).Row(row =>
                                {
                                    row.RelativeItem().AlignRight().Text($"عضو شماره {memberNumber}: {member.FirstName} {member.LastName}")
                                        .SemiBold().FontSize(14).FontColor(Colors.Blue.Darken2);

                                    row.ConstantItem(100).AlignRight().Text(GetRelationshipText(member.Relationship))
                                        .FontSize(11).FontColor(Colors.White);
                                });

                                // Photo and Basic Info Row
                                memberColumn.Item().PaddingBottom(15).Row(row =>
                                {
                                    // Photo Section
                                    row.ConstantItem(150).AlignCenter().Column(photoColumn =>
                                    {
                                        if (!string.IsNullOrEmpty(member.PhotoPath))
                                        {
                                            var photoPath = Path.Combine(_environment.WebRootPath, member.PhotoPath.TrimStart('~', '/'));
                                            if (File.Exists(photoPath))
                                            {
                                                try
                                                {
                                                    photoColumn.Item().Border(1).BorderColor(Colors.Grey.Lighten1)
                                                        .Image(File.ReadAllBytes(photoPath))
                                                        .FitHeight();
                                                }
                                                catch
                                                {
                                                    photoColumn.Item().Height(120).Width(120).Placeholder("خطا در بارگذاری عکس");
                                                }
                                            }
                                            else
                                            {
                                                photoColumn.Item().Height(120).Width(120).Placeholder("عکس موجود نیست");
                                            }
                                        }
                                        else
                                        {
                                            photoColumn.Item().Height(120).Width(120).Placeholder("عکس موجود نیست");
                                        }
                                        photoColumn.Item().PaddingTop(5).Text("عکس")
                                            .FontSize(9).FontColor(Colors.Grey.Medium).AlignCenter();
                                    });

                                    // Basic Info Table
                                    row.RelativeItem().PaddingLeft(15).Table(table =>
                                    {
                                        table.ColumnsDefinition(columns =>
                                        {
                                            columns.RelativeColumn();    // Value
                                            columns.ConstantColumn(100); // Label
                                            columns.RelativeColumn();    // Value
                                            columns.ConstantColumn(100); // Label
                                        });

                                        // Personal Information
                                        table.Cell().AlignRight().PaddingVertical(6).Text(member.NationalId).FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text("شماره تذکره:").SemiBold().FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text(member.BirthDate.ToString("yyyy/MM/dd", new CultureInfo("fa-IR"))).FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text("تاریخ تولد:").SemiBold().FontSize(10);

                                        table.Cell().AlignRight().PaddingVertical(6).Text(GetGenderText(member.Gender)).FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text("جنسیت:").SemiBold().FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text(CalculateAge(member.BirthDate).ToString()).FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text("سن:").SemiBold().FontSize(10);

                                        table.Cell().AlignRight().PaddingVertical(6).Text(GetMemberStatus(member)).FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text("وضعیت:").SemiBold().FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text(member.CreatedDate.ToString("yyyy/MM/dd", new CultureInfo("fa-IR"))).FontSize(10);
                                        table.Cell().AlignRight().PaddingVertical(6).Text("تاریخ ثبت:").SemiBold().FontSize(10);
                                    });
                                });

                                // Additional Details Table
                                memberColumn.Item().Table(detailsTable =>
                                {
                                    detailsTable.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn(); // Value
                                        columns.ConstantColumn(120); // Label
                                        columns.RelativeColumn(); // Value  
                                        columns.ConstantColumn(120); // Label
                                    });

                                    // Additional member details can be added here
                                    detailsTable.Cell().AlignRight().PaddingVertical(4).Text(GetRelationshipText(member.Relationship)).FontSize(10);
                                    detailsTable.Cell().AlignRight().PaddingVertical(4).Text("نقش در خانواده:").SemiBold().FontSize(10);
                                    detailsTable.Cell().AlignRight().PaddingVertical(4).Text(!string.IsNullOrEmpty(member.PhotoPath) ? "دارد" : "ندارد").FontSize(10);
                                    detailsTable.Cell().AlignRight().PaddingVertical(4).Text("عکس:").SemiBold().FontSize(10);
                                });
                            });

                        memberNumber++;
                    }
                }
                else
                {
                    column.Item().AlignCenter().PaddingVertical(40).Text("⸻ هیچ عضوی در این فامیل ثبت نشده است ⸻")
                        .Italic().FontSize(14).FontColor(Colors.Grey.Medium);
                }
            });
        }

        private void ComposeCustomFooter(IContainer container)
        {
            container.BorderTop(1).BorderColor(Colors.Grey.Lighten2).PaddingTop(10).Column(column =>
            {
                column.Item().AlignCenter().Text("این سند به طور اتوماتیک توسط سیستم تذکره الکترونیکی تولید شده است")
                    .FontSize(9).FontColor(Colors.Grey.Medium);

                column.Item().PaddingTop(5).AlignCenter().Row(row =>
                {
                    row.RelativeItem().AlignLeft().Text(text =>
                    {
                        text.Span("تاریخ تولید: ").SemiBold().FontSize(9);
                        text.Span(DateTime.Now.ToString("yyyy/MM/dd HH:mm", new CultureInfo("fa-IR"))).FontSize(9);
                    });

                    row.ConstantItem(100).AlignCenter().Text(text =>
                    {
                        text.Span("صفحه ").FontSize(9);
                        text.CurrentPageNumber().FontSize(9);
                    });

                    row.RelativeItem().AlignRight().Text("NID System v1.0")
                        .FontSize(9).FontColor(Colors.Grey.Medium);
                });
            });
        }

        private string GetFamilyStatus(Family family)
        {
            return family.Members?.Count > 0 ? "فعال" : "غیرفعال";
        }

        private string GetGenderText(string gender)
        {
            return gender?.ToLower() switch
            {
                "male" or "m" => "مرد",
                "female" or "f" => "زن",
                _ => "نامشخص"
            };
        }

        private string GetRelationshipText(FamilyRelationship relationship)
        {
            return relationship switch
            {
                FamilyRelationship.Self => "سرپرست خانواده",
                FamilyRelationship.Husband => "شوهر",
                FamilyRelationship.Wife => "همسر",
                FamilyRelationship.Son => "پسر",
                FamilyRelationship.Daughter => "دختر",
                FamilyRelationship.Other => "سایر اقارب",
                _ => "نامشخص"
            };
        }

        private int CalculateAge(DateTime birthDate)
        {
            var today = DateTime.Today;
            var age = today.Year - birthDate.Year;
            if (birthDate.Date > today.AddYears(-age)) age--;
            return age;
        }

        private string GetMemberStatus(Person member)
        {
            var age = CalculateAge(member.BirthDate);
            return age >= 18 ? "بزرگسال" : "خردسال";
        }
    }
}