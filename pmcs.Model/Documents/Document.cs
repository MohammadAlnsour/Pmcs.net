using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;
using pmcs.Repository;

namespace pmcs.Model.Documents
{
    public class Document
    {
        public int DocumentId { get; set; }

        [Required]
        [StringLength(100)]
        public string DocSubject { get; set; }

        [StringLength(300)]
        public string DocDescription { get; set; }

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

        public int ReceiverId { get; set; }
        public string ReceiverName
        {
            get
            {
                if (this.ReceiverId > 0)
                {
                    var user = new Repository.EntitiesRepos.UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.ReceiverId);
                    return user.FullName;
                }
                return string.Empty;
            }
        }

        public int? CopyToId1 { get; set; }
        public string CopyTo1Name
        {
            get
            {
                if (this.CopyToId1 != null && this.CopyToId1 > 0)
                {
                    var user = new Repository.EntitiesRepos.UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.CopyToId1);
                    return user.FullName;
                }
                return string.Empty;
            }
        }

        public int? CopyToId2 { get; set; }
        public string CopyTo2Name
        {
            get
            {
                if (this.CopyToId2 != null && this.CopyToId2 > 0)
                {
                    var user = new Repository.EntitiesRepos.UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.CopyToId2);
                    return user.FullName;
                }
                return string.Empty;
            }
        }

        public int? CopyToId3 { get; set; }
        public string CopyTo3Name
        {
            get
            {
                if (this.CopyToId3 != null && this.CopyToId3 > 0)
                {
                    var user = new Repository.EntitiesRepos.UsersAccountsRepository(new DB.PmcsDbContext()).GetById(u => u.UserId == this.CopyToId3);
                    return user.FullName;
                }
                return string.Empty;
            }
        }

        public DateTime SendDate { get; set; }

        public int DocumentType { get; set; }
        public string DocumentTypeName
        {
            get
            {
                if (this.DocumentType > 0)
                {
                    switch ((DocumentType)this.DocumentType)
                    {
                        case Core.DocumentType.Pdf:
                            return "Pdf file";
                            break;

                        case Core.DocumentType.Excel:
                            return "Excel file";
                            break;

                        case Core.DocumentType.Word:
                            return "Word file";
                            break;

                        case Core.DocumentType.Image:
                            return "Image file";
                            break;

                        default:
                            return "Pdf file";
                            break;
                    }
                }
                return string.Empty;
            }
        }


        [StringLength(1500)]
        public string DocumentPath { get; set; }

        public int DocumentStatus { get; set; }
        public string DocumentStatusName
        {
            get
            {
                if (this.DocumentStatus > 0)
                {
                    switch ((DocumentStatus)this.DocumentStatus)
                    {
                        case Core.DocumentStatus.New:
                            return "New";
                            break;

                        case Core.DocumentStatus.Read:
                            return "Read";
                            break;

                        case Core.DocumentStatus.Replied:
                            return "Replied";
                            break;

                        default:
                            return "New";
                            break;
                    }
                }
                return string.Empty;
            }
        }

        public bool IsRead { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }
    }
}
