using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Core
{
    public class PmcsUserPrincipal : IPrincipal
    {
        public PmcsUserPrincipal(string username)
        {
            this.Identity = new GenericIdentity(username);
        }
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
        public string UserRoles { get; set; }

        public IIdentity Identity { get; }

        public bool IsInRole(string role)
        {
            var userRoles = this.UserRoles;
            if (!string.IsNullOrEmpty(userRoles))
            {
                var roles = userRoles.Split(",".ToCharArray());
                return roles.Any(r => r == role);
            }
            return false;
        }

    }

}
