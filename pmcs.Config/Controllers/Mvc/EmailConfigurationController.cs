using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.Config.Controllers.Mvc
{
    public class EmailConfigurationController : SecuredBaseController
    {
        // GET: EmailConfiguration
        public ActionResult Index()
        {
            ViewData["emailPage"] = "active";
            ViewData["PageTopTitle"] = "System Email Configuration";
            return View();
        }
    }
}