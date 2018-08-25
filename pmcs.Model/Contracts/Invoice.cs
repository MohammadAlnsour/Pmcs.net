using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class Invoice
    {
        public int InvoiceId { get; set; }

        [StringLength(50)]
        public string InvoiceNumber { get; set; }

        public int MilestoneId { get; set; }

        public string TaskMilestoneName
        {
            get
            {
                var res = new ProjectTasksRepository(new DB.PmcsDbContext()).GetById(t => t.TaskId == this.MilestoneId);
                return res.TaskName;
            }
        }

        public int? InvoiceClassificationId { get; set; }
        public string ClassificationName
        {
            get
            {
                if (this.InvoiceClassificationId != null)
                {
                    var res = new InvoiceClassificationsRepository(new DB.PmcsDbContext()).GetById(c => c.Id == this.InvoiceClassificationId);
                    return res.Name;
                }
                return string.Empty;
            }
        }

        [StringLength(200)]
        public string DescriptionText { get; set; }

        public int POId { get; set; }
        public string PONumber
        {
            get
            {
                var res = new PORepository(new DB.PmcsDbContext()).GetById(p => p.PoId == this.POId);
                return res.PONumber;
            }
        }

        public int? CreditNoteNumber { get; set; }

        public bool ExcludeAging { get; set; }

        [Required]
        [StringLength(200)]
        public string ExcludeAgingReasons { get; set; }

        public double? GrossCULPayable { get; set; }

        public double? SpecialDiscount { get; set; }

        public double? AfterDiscount { get; set; }

        public double? LessPercentDiscount { get; set; }

        public double? AfterLessDiscount { get; set; }

        public double? DiscountOnNet { get; set; }

        public double? PercentageClaimed { get; set; }

        public double? AdvancePayment { get; set; }

        public double? TotalPreviousClaim { get; set; }

        public double? JobLevelDiscount { get; set; }

        public double? JobLevelAdvance { get; set; }

        public double? JobLevelCreditNote { get; set; }

        public double? LessRetention { get; set; }

        public double? LessFreeOfCharge { get; set; }

        public double? LessPenality { get; set; }

        public double? LessAdjustDeduction { get; set; }

        [StringLength(200)]
        public string DeductionRemarks { get; set; }

        public double? CreditNoteAmount { get; set; }

        public double? SubtotalPayable { get; set; }

        public double? SubtotalDeductions { get; set; }

        public double? LessCreditNotes { get; set; }

        public double? AmountPayable { get; set; }

        public DateTime? RecievedDate { get; set; }

        public double? InvoiceAmount { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
