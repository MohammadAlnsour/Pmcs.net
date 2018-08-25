using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using pmcs.Model.Config;
using pmcs.Services;
using pmcs.Services.Interfaces;

namespace pmcs.Config.Controllers.Mvc
{
    public class NotificationsConfigurationController : SecuredBaseController
    {
        private readonly INotificationsTypesService notificationsTypesService;
        public NotificationsConfigurationController(INotificationsTypesService notificationsTypesService)
        {
            this.notificationsTypesService = notificationsTypesService;
        }

        // GET: NotificationsConfiguration
        public ActionResult Index()
        {
            var notifications = notificationsTypesService.GetAllNotificationTypes();
            ViewData["notificationsPage"] = "active";
            ViewData["PageTopTitle"] = "System Email Configuration";
            return View(notifications);
        }

        [HttpPost]
        public ActionResult SaveNotificationType(NotificationTypesModel notificationType)
        {
            if (notificationType == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "user data must be passed to the API");

            try
            {
                var newNotificationType = new NotificationTypesModel()
                {
                    CreatedDate = DateTime.Now,
                    IsActive = true,
                    NotificationText = notificationType.NotificationText,
                    NotificationTypeDescription = notificationType.NotificationTypeDescription,
                    NotificationTypeName = notificationType.NotificationTypeName
                };
                notificationsTypesService.CreateNotificationType(newNotificationType);

                var allNotificationsTypes = notificationsTypesService.GetAllNotificationTypes();
                return PartialView("~/Views/Shared/Partial/NotificationTypesTable.cshtml", allNotificationsTypes);
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}