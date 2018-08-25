using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Config
{
    public class NotificationTypesModel : ModelBase
    {
        public override int ModelPrimaryId => this.TypeId;
        public int TypeId { get; set; }
        public string NotificationTypeName { get; set; }
        public string NotificationTypeDescription { get; set; }
        public string NotificationText { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }


    }
}
