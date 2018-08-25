using pmcs.Model.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class MyDocumentsViewModel
    {
        public Dictionary<Document,List<Reply>> Inbox { get; set; }
        public Dictionary<Document, List<Reply>> Outbox { get; set; }

    }
}
