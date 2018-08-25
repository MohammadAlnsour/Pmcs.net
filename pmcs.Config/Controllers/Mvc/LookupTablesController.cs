using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.Config.Controllers.Mvc
{
    public class LookupTablesController : Controller
    {
        // GET: LookupTables
        public ActionResult Index()
        {
            ViewData["lookupPage"] = "active";
            ViewData["PageTopTitle"] = "System Lookup tables";
            return View();
        }
    }
}