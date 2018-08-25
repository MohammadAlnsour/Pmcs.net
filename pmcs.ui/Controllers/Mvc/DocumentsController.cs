using pmcs.Model.ViewModels;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    public class DocumentsController : SecuredBaseController
    {
        private readonly IDocumentManagementService documentManagementService;
        public DocumentsController(IDocumentManagementService documentManagementService)
        {
            this.documentManagementService = documentManagementService;
        }

        public ActionResult MyDocuments()
        {
            ViewData["DocumentManagement"] = "active";

            var inbox = documentManagementService.GetUserInbox(User.UserId);
            var outbox = documentManagementService.GetUserOutbox(User.UserId);

            var inboxDic = inbox.ToDictionary(i => i, i => documentManagementService.GetDocumentReplies(i.DocumentId).ToList());
            var outboxDic = outbox.ToDictionary(o => o, o => documentManagementService.GetDocumentReplies(o.DocumentId).ToList());

            var viewModel = new MyDocumentsViewModel()
            {
                Inbox = inboxDic,
                Outbox = outboxDic
            };
            return View(viewModel);
        }

        public ActionResult ViewDocument(int id)
        {
            if (id <= 0) return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            ViewData["DocumentManagement"] = "active";
            var document = documentManagementService.GetDocument(id);
            return View(document);
        }

    }
}