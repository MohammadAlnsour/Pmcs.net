using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Model.Tickets
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int ModuleId { get; set; }
        public string ModuleName
        {
            get
            {
                var res = new ModulesRepository(new DB.PmcsDbContext()).GetById(m => m.ModuleId == this.ModuleId);
                return res.ModuleName;
            }
        }

        [Required]
        [StringLength(150)]
        public string TicketSubject { get; set; }

        [StringLength(300)]
        public string Description { get; set; }
        public int SeverityId { get; set; }
        public string Severity
        {
            get
            {
                var res = (TicketSeverity)this.SeverityId;
                string severity = string.Empty;
                switch (res)
                {
                    case TicketSeverity.Enhancement:
                        severity = "Enhancement";
                        break;
                    case TicketSeverity.Normal:
                        severity = "Normal";
                        break;
                    case TicketSeverity.High:
                        severity = "High";
                        break;
                    case TicketSeverity.Critical:
                        severity = "Critical";
                        break;
                    case TicketSeverity.Blocker:
                        severity = "Blocker";
                        break;
                    default:
                        break;
                }
                return severity;
            }
        }

        [Required]
        [StringLength(50)]
        public string TicketNumber { get; set; }

        [StringLength(100)]
        public string Stage { get; set; }

        public int PriorityId { get; set; }

        public string Priority
        {
            get
            {
                var res = (TicketPriority)this.PriorityId;
                string priority = string.Empty;
                switch (res)
                {
                    case TicketPriority.Enhancement:
                        priority = "Enhancement";
                        break;
                    case TicketPriority.Normal:
                        priority = "Normal";
                        break;
                    case TicketPriority.High:
                        priority = "High";
                        break;
                    case TicketPriority.Critical:
                        priority = "Critical";
                        break;
                    case TicketPriority.Blocker:
                        priority = "Blocker";
                        break;
                    default:
                        break;
                }
                return priority;
            }
        }
        public int Status { get; set; }

        public string StatusName
        {
            get
            {
                var res = (TicketStatus)this.Status;
                string status = string.Empty;
                switch (res)
                {
                    case TicketStatus.Open:
                        status = "Open";
                        break;
                    case TicketStatus.Fixed:
                        status = "Fixed";
                        break;
                    //case TicketStatus.Cancelled:
                    //    status = "Cancelled";
                    //    break;
                    case TicketStatus.Closed:
                        status = "Closed";
                        break;
                    default:
                        break;
                }
                return status;
            }
        }

        public int AssignedTo { get; set; }
        public string AssignedToName
        {
            get
            {
                var res = new UsersAccountsRepository(new DB.PmcsDbContext()).GetById(m => m.UserId == this.AssignedTo);
                return res.FullName;
            }
        }


        public int OwnerId { get; set; }
        public string OwnerName
        {
            get
            {
                var res = new UsersAccountsRepository(new DB.PmcsDbContext()).GetById(m => m.UserId == this.OwnerId);
                return res.FullName;
            }
        }

        public DateTime? DueDate { get; set; }

        public DateTime? SLADueDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }


    }
}
