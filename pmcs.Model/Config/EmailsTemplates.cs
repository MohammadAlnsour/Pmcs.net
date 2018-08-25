using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Config
{
    public class EmailsTemplate : ModelBase
    {
        public override int ModelPrimaryId => this.TemplateId;

        public int TemplateId { get; set; }
        public int NotificationTypeId { get; set; }
        [Required]
        [StringLength(300)]
        public string TempalteEmailSubject { get; set; }

        [Required]
        public string TemplateEmailBody { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }


    }
}
