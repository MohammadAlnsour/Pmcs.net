using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace pmcs.Logs
{
    public class ErrorHandlerAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            base.OnException(filterContext);
            if (filterContext == null || filterContext.Exception == null)
                return;

            var exception = filterContext.Exception;
            //Log Exception to the database.

        }
    }
}
