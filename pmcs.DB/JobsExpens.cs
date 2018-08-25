namespace pmcs.DB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ContractsManagement.JobsExpenses")]
    public partial class JobsExpens
    {
        public int Id { get; set; }

        public int JobId { get; set; }

        public int POId { get; set; }

        public int ExpenseTypeId { get; set; }

        public decimal Amount { get; set; }

        public DateTime ExpenseDate { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public virtual Job Job { get; set; }

        public virtual ExpensesType ExpensesType { get; set; }

        public virtual POs POs { get; set; }
    }
}
