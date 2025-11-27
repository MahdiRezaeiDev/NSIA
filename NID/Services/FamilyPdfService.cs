using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using NID.Models;

namespace NID.Services
{
    public class FamilyPdfService
    {
        public byte[] GenerateFamilyPdf(Family family)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(30);
                    page.DefaultTextStyle(x => x.FontSize(12).FontFamily("Tahoma"));

                    page.Header().Row(row =>
                    {
                        row.RelativeItem().Text($"خانواده: {family.FamilyName}")
                            .FontSize(20).Bold();

                        row.ConstantItem(80).AlignRight().Text($"کد: {family.FamilyCode}")
                            .FontSize(14);
                    });

                    page.Content().Padding(10).Column(col =>
                    {
                        col.Item().PaddingBottom(10).Text("اعضای خانواده:")
                            .FontSize(16).Bold().Underline();

                        foreach (var m in family.Members)
                        {
                            col.Item().BorderBottom(1).Padding(5).Row(row =>
                            {
                                row.RelativeItem(3).Column(c =>
                                {
                                    c.Item().Text($"نام: {m.FirstName} {m.LastName}");
                                    c.Item().Text($"نقش: {m.Relationship}");
                                    c.Item().Text($"تاریخ تولد: {m.BirthDate.ToShortDateString()}");
                                    c.Item().Text($"شماره تذکره: {m.NationalId}");
                                });

                                if (!string.IsNullOrEmpty(m.PhotoPath))
                                {
                                    row.ConstantItem(80)
                                        .Image(System.IO.File.ReadAllBytes($"wwwroot{m.PhotoPath}"))
                                        .FitWidth();
                                }
                            });
                        }
                    });

                    page.Footer().AlignCenter().Text("NID System - Generated PDF");
                });
            })
            .GeneratePdf();
        }
    }
}
