using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace pmcs.ui
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "projectDetail",
                url: "Project/{id}/{title}/",
                defaults: new { controller = "Projects", action = "ProjectDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            //routes.MapRoute(
            //    name: "taskDetails",
            //    url: "Project/Tasks/{id}/{title}/",
            //    defaults: new { controller = "Projects", action = "TaskDetails", title = UrlParameter.Optional },
            //    namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            //);

            routes.MapRoute(
                name: "poDetail",
                url: "Contracts/POs/{id}/{title}/",
                defaults: new { controller = "Contracts", action = "POsDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            routes.MapRoute(
                name: "elementDetail",
                url: "Contracts/Elements/{id}/{title}/",
                defaults: new { controller = "Contracts", action = "ElementDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            routes.MapRoute(
                name: "SiteDetails",
                url: "Contracts/Sites/{id}/{title}/",
                defaults: new { controller = "Contracts", action = "SitesDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            routes.MapRoute(
                name: "JobDetails",
                url: "Contracts/Jobs/{id}/{title}/",
                defaults: new { controller = "Contracts", action = "JobsDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            routes.MapRoute(
                name: "invoiceDetails",
                url: "Financial/Invoices/{id}/{title}/",
                defaults: new { controller = "Financial", action = "InvoiceDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            routes.MapRoute(
                name: "inventoryDetails",
                url: "Assets/Inventory/{id}/{title}/",
                defaults: new { controller = "Assets", action = "InventoryDetails", title = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Dashboards", action = "Dashboard", id = UrlParameter.Optional },
                namespaces: new string[] { "pmcs.ui.Controllers.Mvc" }
            );
        }
    }
}
