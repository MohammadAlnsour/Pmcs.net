using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc.Routing;
using System.Web.Mvc;

namespace pmcs.Core
{
    public static class RoutesGetter
    {
        public static string GetTaskDetailsRouteUrl(int taskId)
        {
            try
            {
                UrlHelper urlHelper = new UrlHelper(System.Web.HttpContext.Current.Request.RequestContext);
                return urlHelper.Action("TaskDetails", "Projects", new { id = taskId });
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }

        public static string GetDocumentDetailsRouteUrl(int documentId)
        {
            try
            {
                UrlHelper urlHelper = new UrlHelper(System.Web.HttpContext.Current.Request.RequestContext);
                return urlHelper.Action("ViewDocument", "DocumentManagement", new { id = documentId });
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }
    }
}
