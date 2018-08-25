using Newtonsoft.Json;
using pmcs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace pmcs.Core
{
    public static class FormsAuthenticationUtility
    {
        /// <summary>
        /// Creates a new forms authentication ticket for the logged in user and store it in the response http cookies.
        /// </summary>
        /// <param name="principal"></param>
        public static void SetFormsAuthenticationTicketFromLoginUser(UserAccountModel useraccount)
        {
            var json = useraccount.SerializeObject<UserAccountModel>(); //user.SerializeObject<PmcsUser>();

            FormsAuthentication.SetAuthCookie(useraccount.UserName, false);
            var ticket = new FormsAuthenticationTicket(1, useraccount.UserName, DateTime.Now, DateTime.Now.AddMinutes(60), false, json);
            var encryptedTicket = FormsAuthentication.Encrypt(ticket);
            var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            HttpContext.Current.Response.Cookies.Add(authCookie);
        }

        public static void GetFormsAuthenticationUserFromAuthenticationCookies()
        {
            var formsAuthCookies = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (formsAuthCookies != null)
            {
                var encryptedTicket = formsAuthCookies.Value;
                var decryptedTicket = FormsAuthentication.Decrypt(encryptedTicket);
                if (decryptedTicket != null)
                {
                    var json = decryptedTicket.UserData;
                    if (!string.IsNullOrEmpty(json))
                    {
                        var userObj = json.DeserializeObject<UserAccountModel>();
                        if (userObj != null)
                        {
                            var principalObject = new PmcsUserPrincipal(userObj.UserName)
                            {
                                DepartmentId = userObj.DepartmentId,
                                DistrictId = userObj.DistrictId,
                                Email = userObj.Email,
                                FullName = userObj.FullName,
                                IsAdministrator = userObj.IsAdministrator,
                                Mobile = userObj.Mobile,
                                RoleId = userObj.RoleId,
                                UserId = userObj.UserId,
                                UserName = userObj.UserName,
                                UserRoles = userObj.UserRolesIds
                            };
                            HttpContext.Current.User = principalObject;
                        }
                    }
                }
            }
        }

    }
}
