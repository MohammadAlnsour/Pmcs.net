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
    public class CUL : ModelBase
    {
        public int CULId { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        public double UnitPrice { get; set; }
        public double? Discount { get; set; }


        [StringLength(100)]
        public string UnitOfMeasure { get; set; }

        [StringLength(100)]
        public string Remarks { get; set; }

        [StringLength(20)]
        public string UniqueId { get; set; }

        public int? CULGroupId { get; set; }
        public string CULGroupName
        {
            get
            {
                if (CULGroupId == null) return string.Empty;
                try
                {
                    var res = new CULGroupRepository(new DB.PmcsDbContext()).GetById(g => g.CULGroupId == this.CULGroupId);
                    return res.Description;
                }
                catch (Exception)
                {
                    return string.Empty;
                }
            }
        }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public override int ModelPrimaryId => this.CULId;

    }
}
