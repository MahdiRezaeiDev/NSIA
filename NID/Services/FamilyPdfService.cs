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
                    page.Margin(2, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(11).FontFamily("Yekan"));

                    page.Header().Element(ComposeHeader);
                    page.Content().Element(container => ComposeContent(container, family));
                    page.Footer().Element(ComposeFooter);
                });
            })
            .GeneratePdf();
        }

        private void ComposeHeader(IContainer container)
        {
            container.Row(row =>
            {
                // Right side - Organization info
                row.RelativeItem().Column(column =>
                {
                    column.Item().AlignRight().Text("اداره ملی احصائیه و معلومات")
                        .SemiBold().FontSize(16).FontColor(Colors.Blue.Darken3);

                    column.Item().AlignRight().Text("سیستم تذکره الکترونیکی")
                        .FontSize(12).FontColor(Colors.Grey.Medium);
                });

                // Left side - Date
                row.ConstantItem(80).AlignLeft()
                   .Text(DateTime.Now.ToString("yyyy/MM/dd", new CultureInfo("fa-IR")))
                   .FontSize(10).FontColor(Colors.Grey.Medium);
            });
        }

        private void ComposeContent(IContainer container, Family family)
        {
            container.PaddingVertical(10).Column(column =>
            {
                // Family Information Section
                column.Item().Element(c => ComposeFamilyInfo(c, family));
                column.Item().PaddingTop(20);

                // Members Section
                column.Item().Element(c => ComposeMembersInfo(c, family));
            });
        }

        private void ComposeFamilyInfo(IContainer container, Family family)
        {
            container.Border(1).BorderColor(Colors.Grey.Lighten2).Padding(15).Column(column =>
            {
                column.Item().AlignCenter().Text("اطلاعات خانواده")
                    .SemiBold().FontSize(14).FontColor(Colors.Blue.Darken2);

                column.Item().PaddingTop(10).Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn();    // Value column
                        columns.ConstantColumn(100); // Label column (swapped for RTL)
                        columns.RelativeColumn();    // Value column
                        columns.ConstantColumn(100); // Label column (swapped for RTL)
                    });

                    // First row - RTL order
                    table.Cell().AlignRight().Text(family.FamilyName);
                    table.Cell().AlignRight().Text("نام خانواده:").SemiBold();
                    table.Cell().AlignRight().Text(family.FamilyCode);
                    table.Cell().AlignRight().Text("کد خانواده:").SemiBold();

                    // Second row - RTL order
                    table.Cell().AlignRight().Text(family.Members?.Count.ToString() ?? "0");
                    table.Cell().AlignRight().Text("تعداد اعضا:").SemiBold();
                    table.Cell().AlignRight().Text(family.CreatedDate.ToString("yyyy/MM/dd", new CultureInfo("fa-IR")));
                    table.Cell().AlignRight().Text("تاریخ ثبت:").SemiBold();
                });
            });
        }

        private void ComposeMembersInfo(IContainer container, Family family)
        {
            container.Column(column =>
            {
                column.Item().PaddingBottom(10).AlignRight().Text("اعضای خانواده")
                    .SemiBold().FontSize(14).FontColor(Colors.Blue.Darken2);

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

                    foreach (var member in sortedMembers)
                    {
                        column.Item().PaddingBottom(20).Border(1).BorderColor(Colors.Grey.Lighten2)
                            .Padding(15).Column(memberColumn =>
                            {
                                // Member Header - RTL layout
                                memberColumn.Item().PaddingBottom(10).Row(row =>
                                {
                                    // Relationship badge on the right
                                    row.ConstantItem(120).AlignRight().Text(GetRelationshipText(member.Relationship))
                                        .FontSize(10).FontColor(Colors.Blue.Medium).SemiBold();

                                    // Name on the left (takes remaining space)
                                    row.RelativeItem().AlignRight().Text($"{member.FirstName} {member.LastName}")
                                        .SemiBold().FontSize(12).FontColor(Colors.Blue.Darken1);
                                });

                                // Member Photo
                                if (!string.IsNullOrEmpty(member.PhotoPath))
                                {
                                    var photoPath = Path.Combine(_environment.WebRootPath, member.PhotoPath.TrimStart('~', '/'));
                                    
                                    if (File.Exists(photoPath))
                                    {
                                        try
                                        {
                                            memberColumn.Item().PaddingBottom(10).AlignCenter()
                                                .Image(File.ReadAllBytes(photoPath))
                                                .FitHeight();
                                        }
                                        catch
                                        {
                                            memberColumn.Item().PaddingBottom(10).AlignCenter()
                                                .Height(100).Width(150)
                                                .Placeholder("خطا در بارگذاری عکس");
                                        }
                                    }
                                    else
                                    {
                                        memberColumn.Item().PaddingBottom(10).AlignCenter()
                                            .Height(100).Width(150)
                                            .Placeholder("عکس یافت نشد");
                                    }
                                }
                                else
                                {
                                    memberColumn.Item().PaddingBottom(10).AlignCenter()
                                        .Height(100).Width(150)
                                        .Placeholder("عکس موجود نیست");
                                }

                                // Member Details Table - RTL order
                                memberColumn.Item().Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn();    // Value column
                                        columns.ConstantColumn(50);  // Label column
                                        columns.RelativeColumn();    // Value column  
                                        columns.ConstantColumn(70);  // Label column
                                        columns.RelativeColumn();    // Value column
                                        columns.ConstantColumn(80);  // Label column
                                    });

                                    // First row - Values first, then labels (RTL)
                                    table.Cell().AlignRight().Text(member.NationalId).FontSize(9);
                                    table.Cell().AlignRight().Text("شماره تذکره:").SemiBold().FontSize(9);
                                    table.Cell().AlignRight().Text(member.BirthDate.ToString("yyyy/MM/dd", new CultureInfo("fa-IR"))).FontSize(9);
                                    table.Cell().AlignRight().Text("تاریخ تولد:").SemiBold().FontSize(9);
                                    table.Cell().AlignRight().Text(GetGenderText(member.Gender)).FontSize(9);
                                    table.Cell().AlignRight().Text("جنسیت:").SemiBold().FontSize(9);

                                    // Second row - Values first, then labels (RTL)
                                    table.Cell().AlignRight().Text(CalculateAge(member.BirthDate).ToString()).FontSize(9);
                                    table.Cell().AlignRight().Text("سن:").SemiBold().FontSize(9);
                                    table.Cell().AlignRight().Text(GetMemberStatus(member)).FontSize(9);
                                    table.Cell().AlignRight().Text("وضعیت:").SemiBold().FontSize(9);
                                });
                            });
                    }
                }
                else
                {
                    column.Item().AlignCenter().Text("هیچ عضوی ثبت نشده است")
                        .Italic().FontColor(Colors.Grey.Medium).FontSize(12);
                }
            });
        }

        private void ComposeFooter(IContainer container)
        {
            container.AlignCenter().Row(row =>
            {
                // Page numbers on the left
                row.ConstantItem(50).AlignRight().Text(text =>
                {
                    text.CurrentPageNumber().FontSize(9);
                    text.Span(" / ").FontSize(9);
                    text.TotalPages().FontSize(9);
                });

                // "Page" text
                row.ConstantItem(40).AlignRight().Text("صفحه")
                    .FontSize(9).FontColor(Colors.Grey.Medium);

                // Report generation date on the right
                row.RelativeItem().AlignLeft().Text(text =>
                {
                    text.Span("تاریخ تولید گزارش: ").FontSize(9).SemiBold();
                    text.Span(DateTime.Now.ToString("yyyy/MM/dd HH:mm", new CultureInfo("fa-IR"))).FontSize(9);
                });
            });
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
                FamilyRelationship.Self => "سرپرست",
                FamilyRelationship.Husband => "شوهر",
                FamilyRelationship.Wife => "همسر",
                FamilyRelationship.Son => "پسر",
                FamilyRelationship.Daughter => "دختر",
                FamilyRelationship.Other => "سایر",
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