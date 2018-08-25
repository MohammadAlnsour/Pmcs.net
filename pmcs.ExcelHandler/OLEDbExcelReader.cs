using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.OleDb;
using System.Data;
using System.IO;

namespace pmcs.ExcelHandler
{
    public static class OLEDbExcelReader
    {
        /// <summary>
        /// Reads the excel file from a disk location and convert its first sheet to a datatable.
        /// </summary>
        /// <param name="sheetDiskPath">the physical path of the excel file.</param>
        /// <returns></returns>
        public static DataTable ReadExcelWorkbook(string sheetDiskPath)
        {
            if (!File.Exists(sheetDiskPath)) throw new FileNotFoundException("Excel file cannot be found.");

            var fileName = Path.GetFileName(sheetDiskPath);
            var fileExtension = Path.GetExtension(sheetDiskPath);
            string connectionString = "";

            if (fileExtension.ToLower() == ".xls")
            {
                connectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + sheetDiskPath + "; Extended Properties = \"Excel 8.0;HDR=YES\";";
            }
            else if (fileExtension.ToLower() == ".xlsx")
            {
                connectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + sheetDiskPath + ";Extended Properties = \"Excel 12.0 Xml;HDR=YES\"; ";
            }

            var sheets = GetListOfExcelFileSheets(connectionString);
            if (sheets.Any())
            {
                using (OleDbConnection conn = new OleDbConnection(connectionString))
                {
                    conn.Open();
                    var command = "select * from [" + sheets.FirstOrDefault() + "]";
                    OleDbCommand com = new OleDbCommand(command, conn);
                    OleDbDataAdapter adapter = new OleDbDataAdapter(com);
                    DataSet ds = new DataSet();
                    adapter.Fill(ds);
                    return ds.Tables[0];
                }
            }
            throw new Exception("Cannot find sheets within the document");
        }

        private static List<string> GetListOfExcelFileSheets(string connectionString)
        {
            List<string> listSheet = new List<string>();
            using (OleDbConnection conn = new OleDbConnection(connectionString))
            {
                conn.Open();
                DataTable dtSheet = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                foreach (DataRow drSheet in dtSheet.Rows)
                {
                    if (drSheet["TABLE_NAME"].ToString().Contains("$"))//checks whether row contains '_xlnm#_FilterDatabase' or sheet name(i.e. sheet name always ends with $ sign)
                    {
                        listSheet.Add(drSheet["TABLE_NAME"].ToString());
                    }
                }
            }
            return listSheet;
        }



    }
}
