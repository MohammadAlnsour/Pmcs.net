using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class SitesFileAttachment : ModelBase
    {
        public int AttachmentId { get; set; }

        public int FileId { get; set; }
        public int SiteId { get; set; }

        [StringLength(100)]
        public string FileName { get; set; }

        [StringLength(1500)]
        public string FilePath { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
        public override int ModelPrimaryId => this.AttachmentId;

    }
}
