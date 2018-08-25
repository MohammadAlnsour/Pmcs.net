using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class SitesOperation : ModelBase
    {

        public int OperationId { get; set; }

        public int SiteId { get; set; }

        public int? OperationCenterId { get; set; }

        public bool? SiteRent { get; set; }

        public bool? E1Rent { get; set; }

        public bool? PowerSharingRent { get; set; }

        [StringLength(200)]
        public string OMCDisplay { get; set; }

        [StringLength(100)]
        public string BSCName { get; set; }

        public int? PowerTypeId { get; set; }

        public int? SiteAccessibilityId { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }


        public override int ModelPrimaryId => this.OperationId;
    }
}
