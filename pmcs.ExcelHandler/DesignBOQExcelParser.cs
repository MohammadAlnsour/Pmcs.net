using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.OleDb;
using pmcs.Repository.EntitiesRepos;
using pmcs.DB;

namespace pmcs.ExcelHandler
{
    public class DesignBOQExcelValidator
    {
        public static Dictionary<string, string> ValidateBOQExcelFile(string excelFile)
        {
            Dictionary<string, string> errorsDictionary = new Dictionary<string, string>();
            DataTable excelData = null;
            try
            {
                excelData = OLEDbExcelReader.ReadExcelWorkbook(excelFile);
            }
            catch (Exception ex)
            {
                errorsDictionary.Add("exception", ex.Message);
            }
            int index = 1;
            foreach (DataRow boq in excelData.Rows)
            {
                var jobNumber = boq[0].ToString();
                var cul = boq[1].ToString();
                var quantity = boq[2].ToString();
                var foc = boq[3].ToString();
                var payable = boq[4].ToString();
                var isFoc = boq[5].ToString();

                if (string.IsNullOrEmpty(jobNumber) || string.IsNullOrEmpty(cul) ||
                    string.IsNullOrEmpty(quantity) || string.IsNullOrEmpty(foc) ||
                    string.IsNullOrEmpty(payable) || string.IsNullOrEmpty(isFoc))
                {
                    errorsDictionary.Add("Row value are empty " + index.ToString(), "Row number " + index.ToString() + " contains an empty cell value.");
                }

                if (!ValidateJobNumber(jobNumber))
                {
                    errorsDictionary.Add("Job number is not valid " + index.ToString(), "Row number " + index.ToString() + " contains an invalid job number : " + jobNumber);
                }
                if (!ValidateCULNumber(cul))
                {
                    errorsDictionary.Add("CUL number is not valid " + index.ToString(), "Row number " + index.ToString() + " contains an invalid cul number : " + cul);
                }
                if (!ValidateQuantity(quantity))
                {
                    errorsDictionary.Add("quantity number is not valid " + index.ToString(), "Row number " + index.ToString() + " contains an invalid quantity number : " + quantity);
                }
                if (!ValidateFoc(foc))
                {
                    errorsDictionary.Add("FOC value is not valid " + index.ToString(), "Row number " + index.ToString() + " contains an invalid FOC value : " + foc);
                }
                if (!ValidatePayable(payable))
                {
                    errorsDictionary.Add("payable value is not valid " + index.ToString(), "Row number " + index.ToString() + " contains an invalid payable value : " + payable);
                }
                if (!ValidateIsFoc(isFoc))
                {
                    errorsDictionary.Add("is foc value is not valid " + index.ToString(), "Row number " + index.ToString() + " contains an invalid (is foc) value : " + isFoc);
                }
                index += 1;
            }

            return errorsDictionary;
        }

        private static bool ValidateJobNumber(string jobNumber)
        {
            var jobRepo = new JobsRepository(new PmcsDbContext());
            var result = jobRepo.SearchData(j => j.JobNumber == jobNumber);
            return result.Any();
        }
        private static bool ValidateCULNumber(string culNumber)
        {
            var culRepo = new CULsRepository(new PmcsDbContext());
            var result = culRepo.SearchData(c => c.Description == culNumber || c.Code == culNumber);
            return result.Any();
        }
        private static bool ValidateQuantity(string quantity)
        {
            var result = 0.0;
            return double.TryParse(quantity, out result);
        }
        private static bool ValidateFoc(string foc)
        {
            var result = 0.0;
            return double.TryParse(foc, out result);
        }
        private static bool ValidatePayable(string payable)
        {
            var result = 0.0;
            return double.TryParse(payable, out result);
        }
        private static bool ValidateIsFoc(string isFoc)
        {
            if (isFoc.ToLower() != "true" && isFoc.ToLower() != "false") return false;
            else return true;
        }

    }
}
