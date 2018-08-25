using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    public class StatusCodesController : Controller
    {
        // GET: StatusCodes
        public ActionResult ServerError500()
        {
            var exception = Server.GetLastError();
            return View(exception);
        }

        public ActionResult NotFound404()
        {
            return View();
        }

        public ActionResult NotAuthorized401()
        {
            return View();
        }

    }
}