using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace pmcs.ui.App_Start
{

    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/JQuery")
                        .Include("~/Scripts/jQuery/jquery-1.11.1.min.js")
                        .Include("~/Scripts/jQuery/jquery.validate.min.js")
                        .Include("~/Scripts/tinymce/tinymce.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/Bootstrap")
                        .Include("~/Scripts/Bootstrap/bootstrap.min.js")
                        .Include("~/Scripts/bootstrap/bootstrap-datepicker.js")
                        .Include("~/Scripts/bootstrap/bootstrap-notify.js")
                        .Include("~/Scripts/bootstrap/bootstrap-select.min.js")
                         );

            bundles.Add(new ScriptBundle("~/bundles/Charts")
            .Include("~/Scripts/Charts/chart.min.js")
            .Include("~/Scripts/Charts/chart-data.js")
            .Include("~/Scripts/Charts/easypiechart.js")
            .Include("~/Scripts/Charts/easypiechart-data.js")
             );

            bundles.Add(new ScriptBundle("~/bundles/dhtmlxgantt")
            .Include("~/Scripts/dhtmlxgantt/dhtmlxgantt.js")
            //.Include("~/Scripts/dhtmlxgantt/dhtmlxgantt_fullscreen.js")
             );

            bundles.Add(new ScriptBundle("~/bundles/FullCalendar")
                .Include("~/Scripts/FullCalendar/moment.min.js")
                .Include("~/Scripts/FullCalendar/fullcalendar.min.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/TreeTable")
            .Include("~/Scripts/TreeTable/jquery.treetable.js")
             );

            bundles.Add(new ScriptBundle("~/bundles/DataTable")
            .Include("~/Scripts/DataTables/datatables.min.js")
             );

            bundles.Add(new ScriptBundle("~/bundles/PaginationScript")
            .Include("~/Scripts/Pagination/pagination.min.js")
             );

            bundles.Add(new ScriptBundle("~/bundles/CommonScript")
            .Include("~/Scripts/custom.js")
             );


            bundles.Add(new StyleBundle("~/bundles/BaseStyles")
                        .Include("~/Contents/css/bootstrap.min.css")
                        .Include("~/Contents/css/bootstrap-select.min.css")
                        .Include("~/Contents/css/font-awesome.min.css")
                        .Include("~/Contents/css/datepicker3.css")
                        .Include("~/Contents/css/styles.css")
                        );


            bundles.Add(new StyleBundle("~/bundles/FullCalendarCss")
                          .Include("~/Contents/css/fullcalendar.min.css"));

            bundles.Add(new StyleBundle("~/bundles/KanbanBoardStyle")
                        .Include("~/Contents/css/KanbanBoard.css"));

            bundles.Add(new StyleBundle("~/bundles/DataTableCss")
                         .Include("~/Contents/css/datatables.min.css"));

            bundles.Add(new StyleBundle("~/bundles/Pagination")
                         .Include("~/Contents/css/pagination.min.css"));

            bundles.Add(new StyleBundle("~/bundles/TreeTableCss")
                          .Include("~/Contents/css/jquery.treetable.css")
                          .Include("~/Contents/css/jquery.treetable.theme.default.css"));

        }
    }

}