using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Model.DTOs
{
    public class TemplateTaskTreeTable
    {
        public string DataTTId { get; set; }
        public string DataTTParentId { get; set; }

        public int TemplateId { get; set; }
        public string TemplateName { get; set; }

        public int Id { get; set; }
        public string TaskName { get; set; }
        public int? ParentTaskId { get; set; }
        public int? PreviousTaskId { get; set; }
        public int TaskTemplateType { get; set; }
        public string TaskTemplateTypeName
        {
            get
            {
                var typeName = string.Empty;
                switch (this.TaskTemplateType)
                {
                    case 1:
                        typeName = "Task";
                        break;

                    case 2:
                        typeName = "Milestone";
                        break;

                    case 0:
                        typeName = "";
                        break;

                    default:
                        typeName = "";
                        break;
                }

                return typeName;
            }
        }
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
        public string TaskRelationshipTypeName
        {
            get
            {
                string relationshipName = string.Empty;

                if (this.TaskRelationshipType != null)
                {
                    var relationship = (PredecessorRelationshipType)this.TaskRelationshipType;
                    switch (relationship)
                    {
                        case PredecessorRelationshipType.FinishToStart:
                            relationshipName = "Finish to start";
                            break;
                        case PredecessorRelationshipType.StartToFinish:
                            relationshipName = "Start to finish";
                            break;
                        case PredecessorRelationshipType.StartToStart:
                            relationshipName = "Start to start";
                            break;
                        case PredecessorRelationshipType.FinishToFinish:
                            relationshipName = "Finish to finish";
                            break;
                        default:
                            break;
                    }
                }
                return relationshipName;
            }
        }
        public int? Lagdays { get; set; }
        public string LagdaysString
        {
            get
            {
                return this.Lagdays == null ? string.Empty : this.Lagdays.ToString();
            }
        }

    }
}
