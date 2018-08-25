using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Model.ViewModels
{
    public class DashboardViewModel
    {
        public List<KanbanBoardWorkflowTask> FinishedTasks { get; set; }
        public List<KanbanBoardWorkflowTask> OngoingTasks { get; set; }
        public List<KanbanBoardWorkflowTask> NeedActionTasks { get; set; }


    }
}
