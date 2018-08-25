using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Models
{
    public class UserAccountModel : ModelBase
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public string Mobile { get; set; }
        public string RoleName { get; }
        public bool IsAdministrator { get; set; }
        public int? DepartmentId { get; set; }
        public string Department { get; }
        public int? DistrictId { get; set; }
        public string DistrictName { get; }
        public string UserRolesIds { get; set; }
        public string[] UserRolesNames { get; }
        public bool IsActive { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public override int ModelPrimaryId => this.UserId;
    }
}
