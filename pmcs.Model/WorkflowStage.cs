using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.LookupRepos;
using System.Data.Linq;

namespace pmcs.Model
{
    public class WorkflowStage : ModelBase
    {
        public int StageId { get; set; }
        public string StageName { get; set; }

        public string TrackingEntity { get; set; }

        public string TrackingOwner { get; set; }

        public int StageOrderNumber { get; set; }

        public bool? IsLockingStage { get; set; }

        public bool ReferenceNumberRequired { get; set; }

        public string AllowedActionsIds { get; set; }
        public string AllowedActions
        {
            get
            {

                var data = (new WorkflowActionTypesRepository(new DB.PmcsDbContext())).GetAll()
                    .Where(action => AllowedActionsIds.Contains(action.ActionId.ToString()))
                    .Select(action => action.ActionName)
                    .Aggregate((action1, action2) => action1 + ", " + action2);

                return data;
            }
        }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public override int ModelPrimaryId => this.StageId;
        public int? RoleId { get; set; }
        public string RoleName
        {
            get
            {
                if (this.RoleId == null) return "";
                var roleId = Convert.ToInt32(this.RoleId);
                var res = new Repository.EntitiesRepos.RolesRepository(new DB.PmcsDbContext()).GetById(r => r.RoleId == roleId);
                return res.RoleName;
                //return string.Empty;
            }
        }

    }
}
