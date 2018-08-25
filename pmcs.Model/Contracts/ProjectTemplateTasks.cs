using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class ProjectTemplateTasks
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public string TaskName { get; set; }
        public int? ParentTaskId { get; set; }
        public int? PreviousTaskId { get; set; }
        public int TaskTemplateType { get; set; }
        public string TaskCode { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
        public int? ResponsibleRoleId { get; set; }
        public DateTime? VersionDate { get; set; }
        public string Output { get; set; }
        public string KPIs { get; set; }
        public string Objectives { get; set; }
        public string StartCriteria { get; set; }
        public string EndCriteria { get; set; }
        public string Reporting { get; set; }
        public int? TaskOwnerId { get; set; }
        public bool? IsMileStone { get; set; }
        public string TaskRisk { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? TaskDuration { get; set; }
        public int? TaskRelationshipType { get; set; }
        public int? Lagdays { get; set; }


    }
}
