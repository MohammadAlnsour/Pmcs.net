using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Documents
{
    public class Reply
    {
        public int ReplyId { get; set; }

        public int DocumentId { get; set; }
        public string DocumentSubject
        {
            get
            {
                if (this.DocumentId > 0)
                {
                    var document = new Repository.EntitiesRepos.DocumentsRepository(new DB.PmcsDbContext()).GetById(d => d.DocumentId == this.DocumentId);
                    return document.DocSubject;
                }
                return string.Empty;
            }
        }

        [Required]
        [StringLength(300)]
        public string ReplyDescription { get; set; }

        public int SenderId { get; set; }
        public string SenderName
        {
            get
            {
                if (this.SenderId > 0)
                {
                    var user = new Repository.EntitiesRepos.UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.SenderId);
                    return user.FullName;
                }
                return string.Empty;
            }
        }

        public DateTime SendDate { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
