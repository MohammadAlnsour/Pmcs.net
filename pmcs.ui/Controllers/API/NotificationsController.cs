using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using pmcs.Services.Interfaces;
using pmcs.Services.SharedServices;

namespace pmcs.ui.Controllers.API
{
    public class NotificationsController : SecuredBaseAPIController
    {
        private readonly INotificationsService notificationsService;

        public NotificationsController(INotificationsService notificationsService)
        {
            this.notificationsService = notificationsService;
        }

        [HttpGet]
        [Route("api/Notifications/GetUserUnreadNotifications")]
        public IHttpActionResult GetUserUnreadNotifications()
        {
            if (User == null) return BadRequest("user id could not be found in the request body");
            try
            {
                return Ok(notificationsService.GetUserUnreadNotificationMessages(User.UserId).Take(5));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
