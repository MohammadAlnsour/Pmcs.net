using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Model.Contracts
{
    public class KanbanBoardWorkflowTask
    {
        public string ObjectNumber { get; set; }
        public string LastNotes { get; set; }
        public DateTime? ReceivedDate { get; set; }
        public DateTime? ProcessedDate { get; set; }

        public int WorkflowId { get; set; }
        public WorkflowType WorkflowItemType { get; set; }
        
        public string URL { get; set; }

    }
}
