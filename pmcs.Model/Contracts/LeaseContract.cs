using pmcs.Core;
using pmcs.Models;
using pmcs.Repository.LookupRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class LeaseContract : ModelBase
    {
        public override int ModelPrimaryId => this.ContractId;
        public int ContractId { get; set; }

        [Required]
        [StringLength(100)]
        public string LeaseContractNumber { get; set; }

        public DateTime LeaseStartDate { get; set; }

        public DateTime LeaseEndDate { get; set; }

        [StringLength(15)]
        public string LeaseDuration { get; set; }

        public int PaymentFrequency { get; set; }
        public string PaymentFrequencyName
        {
            get
            {
                if (this.PaymentFrequency > 0)
                {
                    switch ((PaymentFrequency)this.PaymentFrequency)
                    {
                        case Core.PaymentFrequency.BiYearly:
                            return "Bi Yearly";
                            break;

                        case Core.PaymentFrequency.Monthly:
                            return "Monthly";
                            break;

                        case Core.PaymentFrequency.QuarterYearly:
                            return "Quarter Yearly";
                            break;

                        case Core.PaymentFrequency.Weekly:
                            return "Weekly";
                            break;

                        case Core.PaymentFrequency.Yearly:
                            return "Yearly";
                            break;

                        default: return string.Empty;
                    }
                }
                return string.Empty;
            }
        }

        public int? NumberOfPayments { get; set; }

        public decimal? AmountPerPayment { get; set; }

        [Required]
        [StringLength(100)]
        public string PRNumber { get; set; }

        public int SiteOwnerId { get; set; }

        public bool? IsLocked { get; set; }

        public decimal? TotalLeaseAmount { get; set; }

        public DateTime PRReservationDate { get; set; }

        public DateTime? PREnteredDate { get; set; }

        public DateTime? PRApprovedDate { get; set; }

        [StringLength(50)]
        public string PONumber { get; set; }

        public DateTime? PODate { get; set; }

        public decimal? POValue { get; set; }

        public decimal? Balance { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
        public string SitesIds { get; set; }

        public string SiteOwnerName
        {
            get
            {
                return new SiteOwnersRepository(new DB.PmcsDbContext()).GetById(o => o.OwnerId == this.SiteOwnerId).Name;
            }
        }


    }
}
