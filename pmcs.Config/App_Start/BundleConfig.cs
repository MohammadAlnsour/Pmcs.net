using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace pmcs.Config.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/JQuery")
                        .Include("~/Scripts/jquery/jquery-1.10.2.min.js")
                        .Include("~/Scripts/jquery/jquery.validate.min.js")
                        .Include("~/Scripts/zTree/jquery.ztree.core.min.js")
                        .Include("~/Scripts/tinymce/tinymce.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/Bootstrap")
                        .Include("~/Scripts/bootstrap/bootstrap.min.js")
                        //.Include("~/Scripts/bootstrap/bootstrap-checkbox-radio.js")
                        .Include("~/Scripts/bootstrap/bootstrap-notify.js")
                        .Include("~/Scripts/bootstrap/bootstrap-table-expandable.js")
                         );

            bundles.Add(new ScriptBundle("~/bundles/Themescripts")
                        .Include("~/Scripts/paper-dashboard.js")
                        .Include("~/Scripts/demo.js")
                        .Include("~/Scripts/App/App.js"));

            bundles.Add(new ScriptBundle("~/bundles/Charts")
                        .Include("~/Scripts/chartist.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/login")
                        .Include("~/Scripts/App/Login.js")
                        );



            bundles.Add(new StyleBundle("~/bundles/BaseStyle")
                        .Include("~/Contents/css/bootstrap.min.css")
                        .Include("~/Contents/css/animate.min.css")
                        .Include("~/Contents/css/paper-dashboard.css")
                        .Include("~/Contents/css/demo.css")
                        .Include("~/Contents/css/themify-icons.css")
                        .Include("~/Contents/css/zTreeStyle.css")
                        );

        }
    }
}