using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using pmcs.Core;
using System.Web.Security;

namespace pmcs.ui.BaseRazorViews
{
    public class BaseRazorViews<T> : WebViewPage<T>
    {
        public override void Execute()
        {
        }
        public new PmcsUserPrincipal User { get => HttpContext.Current.User as PmcsUserPrincipal; }
    }


    public class BaseRazorViews : WebViewPage
    {
        public override void Execute()
        {
        }
        public new PmcsUserPrincipal User { get => HttpContext.Current.User as PmcsUserPrincipal; }
    }

}