using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace pmcs.Core
{
    public static class Helpers
    {
        private static readonly Random getrandom = new Random();

        public static string RenderViewToString(ControllerContext context, string viewName, object model)
        {
            if (string.IsNullOrEmpty(viewName))
                viewName = context.RouteData.GetRequiredString("action");

            var viewData = new ViewDataDictionary(model);

            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(context, viewName);
                var viewContext = new ViewContext(context, viewResult.View, viewData, new TempDataDictionary(), sw);
                viewResult.View.Render(viewContext, sw);
                return sw.GetStringBuilder().ToString();
            }
        }

        public static string RenderPartial(string partialName, object model)
        {
            var sw = new StringWriter();
            var httpContext = new HttpContextWrapper(HttpContext.Current);

            // point to an empty controller
            var routeData = new RouteData();
            routeData.Values.Add("controller", "EmptyController");

            var controllerContext = new ControllerContext(new RequestContext(httpContext, routeData), new EmptyController());
            var view = ViewEngines.Engines.FindPartialView(controllerContext, partialName).View;
            view.Render(new ViewContext(controllerContext, view, new ViewDataDictionary { Model = model }, new TempDataDictionary(), sw), sw);
            return sw.ToString();
        }

        public static string GetRandomColor()
        {
            var colors = new string[] { "#FF9999", "#009999", "#97B35D", "#EF7D23", "#FFF8DC", "#0095FF",
                "#5FBA7D", "#62B0DF", "#F74F57", "#DB786A", "#FFCF4D", "#0095FF", "#FCFCFC",
                "#0050C5", "#FE6602", "#5087D7", "#50B4E2", "#00A1C1", "#008000", "#0050C5", "#3EA9D9",
                "#E74C3C", "#44A5FF", "#5067A4", "#1AB3F1", "#E63343", "#F05F70", "#F5D5B3",
                "#E2E7EA", "#939EA7", "#BDD2EA", "#4D9AEF", "#859EBF", "#30A5FF", "#C2762B", "#FDDC7F",
                "#C1C1C1","#F4233E","#F0713C"};

            var randomIndex = getrandom.Next(0, colors.Length - 1);
            return colors[randomIndex];
        }

        public static DocumentType GetDocumentType(string path)
        {
            if (string.IsNullOrEmpty(path)) throw new ArgumentNullException("path");

            var fileName = path.Substring(path.LastIndexOf(@"/"));
            var ext = Path.GetExtension(fileName).Replace(".", "");

            switch (ext)
            {
                case "gif":
                    return DocumentType.Image;
                    break;

                case "jpg":
                    return DocumentType.Image;
                    break;

                case "png":
                    return DocumentType.Image;
                    break;

                case "bmp":
                    return DocumentType.Image;
                    break;

                case "tiff":
                    return DocumentType.Image;
                    break;

                case "doc":
                    return DocumentType.Word;
                    break;

                case "docx":
                    return DocumentType.Word;
                    break;

                case "xls":
                    return DocumentType.Excel;
                    break;

                case "xlsx":
                    return DocumentType.Excel;
                    break;

                case "pdf":
                    return DocumentType.Pdf;
                    break;

                default:
                    return DocumentType.NotSupported;
                    break;
            }
        }

    }

    class EmptyController : Controller { }
}
