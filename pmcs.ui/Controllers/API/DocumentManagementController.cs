using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using pmcs.Model.Documents;
using pmcs.Services.Interfaces;
using pmcs.Services.DocumentServices;
using pmcs.Core;
using pmcs.Notifications;
using System.IO;

namespace pmcs.ui.Controllers.API
{
    public class DocumentManagementController : SecuredBaseAPIController
    {
        private readonly IDocumentManagementService documentManagementService;
        private readonly INotificationsService notificationsService;
        private readonly IAuthService authService;

        public DocumentManagementController(IDocumentManagementService documentManagementService,
            INotificationsService notificationsService,
            IAuthService authService)
        {
            this.documentManagementService = documentManagementService;
            this.notificationsService = notificationsService;
            this.authService = authService;
        }

        [HttpPost]
        [Route("api/DocumentManagement/UploadFile")]
        public IHttpActionResult UploadFile()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest(HttpStatusCode.UnsupportedMediaType.ToString());
            }
            var root = HttpContext.Current.Server.MapPath("~/FilesContainer/");
            if (!Directory.Exists(root)) Directory.CreateDirectory(root);
            //var provider = new MultipartFormDataStreamProvider(root);

            if (HttpContext.Current.Request.Files.Count > 0)
            {
                HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];

                try
                {
                    // await Request.Content.ReadAsMultipartAsync(provider);

                    postedFile.SaveAs(root + postedFile.FileName);
                    var virtualPath = HttpContext.Current.Request.Url.Scheme + "://" +
                                      HttpContext.Current.Request.Url.Host +
                                      (HttpContext.Current.Request.Url.Port > 0 ? ":" + HttpContext.Current.Request.Url.Port.ToString() : "") +
                                      "/FilesContainer/";
                    //foreach (MultipartFileData file in provider.FileData)
                    //{
                    //    virtualPath += file.Headers.ContentDisposition.FileName.Replace(@"""", "");
                    //}

                    return Ok(virtualPath + postedFile.FileName);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
            return BadRequest("No files can be found in the request body.");

        }

        [HttpPost]
        [Route("api/DocumentManagement/PostDocument")]
        public IHttpActionResult PostDocument(Document document)
        {
            if (document == null) return BadRequest("Can't find the document object in the request body.");

            try
            {
                document.CreatedDate = DateTime.Now;
                document.DocumentStatus = (int)DocumentStatus.New;
                document.DocumentType = (int)Helpers.GetDocumentType(document.DocumentPath);
                document.SenderId = User.UserId;
                document.SendDate = DateTime.Now;
                document.IsRead = false;
                document.IsActive = true;
                var id = documentManagementService.CreateDocument(document);

                Notification.System(new List<Models.UserAccountModel>() { authService.GetUsersAccount(document.ReceiverId) },
                    Notifications.Config.NotificationObjectType.NewDocument,
                    document.SenderId,
                    RoutesGetter.GetDocumentDetailsRouteUrl(id), document);

                var outbox = documentManagementService.GetUserOutbox(User.UserId);

                var partialView = Helpers.RenderPartial("~/Views/Shared/Partial/Documents/Outbox.cshtml", outbox);
                return Ok(partialView);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/DocumentManagement/PostReply")]
        public IHttpActionResult PostReply(Reply reply)
        {
            if (reply == null) return BadRequest("Can't find the reply object in the request body.");

            try
            {
                reply.CreatedDate = DateTime.Now;
                reply.SenderId = User.UserId;
                reply.SendDate = DateTime.Now;
                reply.IsActive = true;
                var id = documentManagementService.PostReply(reply);

                //Notification.System(new List<Models.UserAccountModel>() { authService.GetUsersAccount(reply.ReceiverId) },
                //    Notifications.Config.NotificationObjectType.NewDocument,
                //    reply.SenderId,
                //    RoutesGetter.GetDocumentDetailsRouteUrl(id), reply);

                var replies = documentManagementService.GetDocumentReplies(reply.DocumentId);
                return Ok(replies);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/DocumentManagement/GetDocument/{documentId}")]
        [HttpGet]
        public IHttpActionResult GetDocument(int documentId)
        {
            if (documentId <= 0) return BadRequest("document Id connot be found in the request url");
            try
            {
                return Ok(documentManagementService.GetDocument(documentId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("api/DocumentManagement/GetDocumentReplies/{documentId}")]
        [HttpGet]
        public IHttpActionResult GetDocumentReplies(int documentId)
        {
            if (documentId <= 0) return BadRequest("document Id connot be found in the request url");
            try
            {
                return Ok(documentManagementService.GetDocumentReplies(documentId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
