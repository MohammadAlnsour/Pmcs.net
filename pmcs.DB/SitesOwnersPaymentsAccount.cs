namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.SitesOwnersPaymentsAccounts")]
    public partial class SitesOwnersPaymentsAccount
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public int PaymentMethodId { get; set; }

        [StringLength(100)]
        public string AccountNumber { get; set; }

        [StringLength(100)]
        public string IBANNumber { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual SitesOwner SitesOwner { get; set; }

        public virtual PaymentMethod PaymentMethod { get; set; }
    }
}
