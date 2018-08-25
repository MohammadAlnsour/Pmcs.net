using pmcs.Model.Documents;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.DocumentServices
{
    public class DocumentManagementService : IDocumentManagementService
    {
        private readonly DocumentsRepository documentsRepository;
        private readonly DocumentRepliesRepository repliesRepository;

        public DocumentManagementService(DocumentsRepository documentsRepository,
            DocumentRepliesRepository repliesRepository)
        {
            this.documentsRepository = documentsRepository;
            this.repliesRepository = repliesRepository;
        }
        public int CreateDocument(Document document)
        {
            var doc = documentsRepository.Insert(document.AutoMapObject<Document, DB.Document>());
            return doc.DocumentId;
        }

        public IEnumerable<Document> GetAllDocuments()
        {
            return documentsRepository
                 .GetAll()
                 .Select(d => d.AutoMapObject<DB.Document, Document>())
                 .OrderByDescending(d => d.DocumentId);
        }

        public Document GetDocument(int documentId)
        {
            return documentsRepository
                 .GetById(d => d.DocumentId == documentId)
                 .AutoMapObject<DB.Document, Document>();
        }

        public IEnumerable<Reply> GetDocumentReplies(int documentId)
        {
            return repliesRepository
                 .SearchData(r => r.DocumentId == documentId)
                 .Select(r => r.AutoMapObject<DB.DocumentReply, Reply>())
                 .OrderByDescending(r => r.ReplyId);
        }

        public Reply GetReply(int replyId)
        {
            return repliesRepository
               .GetById(r => r.ReplyId == replyId)
               .AutoMapObject<DB.DocumentReply, Reply>();
        }

        public IEnumerable<Document> GetUserInbox(int userId)
        {
            return documentsRepository
                 .SearchData(d => d.ReceiverId == userId)
                 .Select(d => d.AutoMapObject<DB.Document, Document>())
                 .OrderByDescending(d => d.DocumentId);
        }

        public IEnumerable<Document> GetUserOutbox(int userId)
        {
            return documentsRepository
                 .SearchData(d => d.SenderId == userId)
                 .Select(d => d.AutoMapObject<DB.Document, Document>())
                 .OrderByDescending(d => d.DocumentId);
        }

        public int PostReply(Reply reply)
        {
            var dbreply = repliesRepository.Insert(reply.AutoMapObject<Reply, DB.DocumentReply>());
            return dbreply.ReplyId;
        }

        public void UpdateDocument(Document document)
        {
            var original = documentsRepository.GetById(d => d.DocumentId == document.DocumentId);
            documentsRepository.Update(original, document.AutoMapObject<Document, DB.Document>());
        }

        public void UpdateReply(Reply reply)
        {
            var original = repliesRepository.GetById(r => r.ReplyId == reply.ReplyId);
            repliesRepository.Update(original, reply.AutoMapObject<Reply, DB.DocumentReply>());
        }

    }
}
