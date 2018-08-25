using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class CULGroup : ModelBase
    {
        public int CULGroupId { get; set; }

        [Required]
        [StringLength(50)]
        public string Key { get; set; }

        [Required]
        [StringLength(300)]
        public string Description { get; set; }

        [StringLength(50)]
        public string UniqueId { get; set; }

        public int? CurrencyId { get; set; }

        public int? IsLocked { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public override int ModelPrimaryId => this.CULGroupId;

    }
}
