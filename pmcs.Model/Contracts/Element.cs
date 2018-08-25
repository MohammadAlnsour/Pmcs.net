using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class Element
    {
        public int ElementId { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string ElementName { get; set; }

        [StringLength(50)]
        public string ElementName2 { get; set; }

        [StringLength(50)]
        public string Level2 { get; set; }

        [StringLength(100)]
        public string UniqueId { get; set; }

        [StringLength(50)]
        public string Level1 { get; set; }

        public long? SortKey { get; set; }

        public long? MaxCULKey { get; set; }

        public int? ContractorId { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
