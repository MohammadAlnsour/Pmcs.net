namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.LeasePaymentTransactions")]
    public partial class LeasePaymentTransaction
    {
        [Key]
        public int TransactionId { get; set; }

        public int LeaseId { get; set; }

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

        public virtual LeaseContract LeaseContract { get; set; }
    }
}
