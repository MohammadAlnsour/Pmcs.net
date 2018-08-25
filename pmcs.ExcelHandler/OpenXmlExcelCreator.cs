using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.ExcelHandler
{
    internal static class OpenXmlExcelCreator<T>
    {
        internal static void WriteExcelFileContent(List<T> data, string path)
        {
            using (SpreadsheetDocument document = SpreadsheetDocument.Create(path, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new DocumentFormat.OpenXml.Spreadsheet.Workbook();
                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                worksheetPart.Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet();

                Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());
                Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Sheet1" };
                sheets.Append(sheet);
                workbookPart.Workbook.Save();

                SheetData sheetData = worksheetPart.Worksheet.AppendChild(new SheetData());
                WriteHeaderRow(data, sheetData);
                foreach (var obj in data)
                {
                    var objPropsValues = ReflectionObjectReader<T>.GetObjectPropertiesValues(obj);
                    Row row = new Row();
                    foreach (var kvp in objPropsValues)
                    {
                        row.Append(new Cell()
                        {
                            CellValue = new CellValue(kvp.Value),
                            DataType = CellValues.String
                        });
                    }
                    sheetData.AppendChild(row);
                }
                worksheetPart.Worksheet.Save();
            }
        }

        private static void WriteHeaderRow(IEnumerable<T> data, SheetData sheetData)
        {
            var obj = data.FirstOrDefault();
            var objPropsValues = ReflectionObjectReader<T>.GetObjectPropertiesValues(obj);
            Row row = new Row();
            foreach (var kvp in objPropsValues)
            {
                row.Append(new Cell()
                {
                    CellValue = new CellValue(kvp.Key),
                    DataType = CellValues.String
                });
            }
            sheetData.AppendChild(row);
        }


    }
}
