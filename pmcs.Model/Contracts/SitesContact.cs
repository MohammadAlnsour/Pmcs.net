using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class SitesContact : ModelBase
    {
        public int ContactId { get; set; }

        public int SiteId { get; set; }

        [StringLength(50)]
        public string SiteOwnerName { get; set; }

        [StringLength(200)]
        public string Address1 { get; set; }

        [StringLength(200)]
        public string Address2 { get; set; }

        [StringLength(200)]
        public string Directions { get; set; }

        [StringLength(200)]
        public string ContactPerson { get; set; }

        [StringLength(20)]
        public string Mobile { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public override int ModelPrimaryId => this.ContactId;

    }
}
