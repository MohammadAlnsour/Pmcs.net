using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Documents;

namespace pmcs.Services.Interfaces
{
    public interface IDocumentManagementService
    {
        int CreateDocument(Document document);
        void UpdateDocument(Document document);

        IEnumerable<Document> GetAllDocuments();
        IEnumerable<Document> GetUserInbox(int userId);
        IEnumerable<Document> GetUserOutbox(int userId);

        Document GetDocument(int documentId);

        int PostReply(Reply reply);
        void UpdateReply(Reply reply);
        Reply GetReply(int replyId);
        IEnumerable<Reply> GetDocumentReplies(int documentId);


    }
}
