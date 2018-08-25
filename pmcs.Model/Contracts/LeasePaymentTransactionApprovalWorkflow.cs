using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Repository.ConfigRepos;

namespace pmcs.Model.Contracts
{
    public class LeasePaymentTransactionApprovalWorkflow : ModelBase
    {
        public int Id { get; set; }

        public int LeaseId { get; set; }

        public string LeaseContractNumber
        {
            get
            {
                try
                {
                    var res = new LeaseContractsRepository(new DB.PmcsDbContext()).GetById(c => c.ContractId == this.LeaseId);
                    return res.LeaseContractNumber;
                }
                catch (Exception ex)
                {
                    return string.Empty;
                }
            }
        }

        public int? TransactionId { get; set; }

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

        public DateTime ReceivedDate { get; set; }

        public string ReceivedDateString
        {
            get
            {
                return this.ReceivedDate.ToShortDateString();
            }
        }
        public DateTime? ProcessedDate { get; set; }

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

        public int? RejectionReasonId { get; set; }

        [StringLength(100)]
        public string OwnerName { get; set; }

        [StringLength(50)]
        public string Duration { get; set; }

        [StringLength(50)]
        public string ReferenceNumber { get; set; }

        [StringLength(300)]
        public string Remarks { get; set; }

        [StringLength(50)]
        public string SequentialId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public bool IsFinished { get; set; }

        public override int ModelPrimaryId => this.Id;

    }
}
