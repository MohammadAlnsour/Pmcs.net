using pmcs.Models;
using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class InvoicesApprovalWorkflow : ModelBase
    {
        public int Id { get; set; }

        //public int WorkflowId
        //{
        //    get { return this.Id; }
        //}

        public int InvoiceId { get; set; }

        public string InvoiceNumber
        {
            get
            {
                try
                {
                    var res = new InvoicesRepository(new DB.PmcsDbContext()).GetById(s => s.InvoiceId == this.InvoiceId);
                    return res.InvoiceNumber;
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }

        public int StageId { get; set; }

        public string StageName
        {
            get
            {
                try
                {
                    var res = new WorkflowStagesRepository(new DB.PmcsDbContext()).GetById(s => s.StageId == this.StageId);
                    return res.StageName;

                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }

        public string ReceivedDateString
        {
            get
            {
                return this.CreatedDate.ToShortDateString();
            }
        }

        public string[] StageAllowedActions
        {
            get
            {
                try
                {
                    var res = new WorkflowStagesRepository(new DB.PmcsDbContext()).GetById(s => s.StageId == this.StageId);
                    return res.AllowedActionsIds.Split(",".ToCharArray());
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }

        public int? Status { get; set; }

        public string StatusName
        {
            get
            {
                if (this.Status != null)
                {
                    switch (this.Status)
                    {
                        case 1:
                            return "New";
                            break;
                        case 2:
                            return "Forwarded";
                            break;
                        case 3:
                            return "Approved";
                            break;
                        case 4:
                            return "Rejected";
                            break;
                        case 5:
                            return "Cancelled";
                            break;
                        case 6:
                            return "Held";
                            break;
                        case 7:
                            return "InHand";
                            break;
                        case 8:
                            return "Accepted At Invoice Submission";
                            break;
                        default:
                            return "No Action";
                            break;
                    }
                }
                return "No action is made";
            }
        }

        public int? Owner { get; set; }

        public int? RejectionReasonId { get; set; }

        [StringLength(50)]
        public string ReferenceNumber { get; set; }

        public int? SequentialId { get; set; }

        public int? TotalAging { get; set; }

        public int? TotalAgingToCeo { get; set; }

        public int? TotalNumberOfRejections { get; set; }

        [StringLength(300)]
        public string TrackingRemarks { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
        public bool IsFinished { get; set; }

        public string OwnerName { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public string Remarks { get; set; }


        public override int ModelPrimaryId => this.Id;

    }
}
