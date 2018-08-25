using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class ProjectTemplates
    {
        public int TemplateId { get; set; }

        [Required]
        [StringLength(100)]
        public string TemplateName { get; set; }

        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        //public override int ModelPrimaryId => this.TemplateId;

    }
}
