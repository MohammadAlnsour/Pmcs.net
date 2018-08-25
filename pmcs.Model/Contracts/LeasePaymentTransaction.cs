using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Model.Contracts
{
    public class LeasePaymentTransaction : ModelBase
    {
        public int TransactionId { get; set; }

        public int LeaseId { get; set; }

        public string LeaseContractNumnber
        {
            get
            {
                var res = new LeaseContractsRepository(new DB.PmcsDbContext()).GetById(c => c.ContractId == this.LeaseId);
                return res.LeaseContractNumber;
            }
        }

        [StringLength(200)]
        public string PaymentTransactionNumber { get; set; }

        public bool ElectricCharges { get; set; }

        [StringLength(20)]
        public string PaymentSequenceId { get; set; }

        public double? Amount { get; set; }

        public int? LeasePaymentStatus { get; set; }

        public DateTime? PaymentDueDate { get; set; }

        [StringLength(50)]
        public string ReceipeNumber { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public override int ModelPrimaryId => this.TransactionId;

    }
}
