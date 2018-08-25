using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.ExcelHandler
{
    public class OpenXmlExporter
    {
        //class members
        public string ExcelFilePath { get; set; }
        public OpenXmlExporter(string excelfilePath)
        {
            this.ExcelFilePath = excelfilePath;
        }
        public void ExportIEnumerableToExcel<T>(List<T> objects)
        {
            if (objects == null || !objects.Any()) throw new ArgumentNullException("objects");
            OpenXmlExcelCreator<T>.WriteExcelFileContent(objects, ExcelFilePath);
        }

    }
}
