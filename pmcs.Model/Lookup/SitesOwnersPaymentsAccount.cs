using pmcs.Models;
using pmcs.Repository.LookupRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Lookup
{
    public class SitesOwnersPaymentsAccount : ModelBase
    {
        public override int ModelPrimaryId => this.Id;

        public int Id { get; set; }

        public int OwnerId { get; set; }
        public string OwnerName
        {
            get
            {
                try
                {
                    var res = new SiteOwnersRepository(new DB.PmcsDbContext()).GetById(o => o.OwnerId == this.OwnerId);
                    return res.Name;
                }
                catch (Exception)
                {
                    return string.Empty;
                }
            }
        }

        public int PaymentMethodId { get; set; }
        public string PaymentMethodName {
            get
            {
                try
                {
                    var res = new PaymentMethodsRepository(new DB.PmcsDbContext()).GetById(p => p.Id == this.PaymentMethodId);
                    return res.Name;
                }
                catch (Exception)
                {
                    return string.Empty;
                }
            }
        }

        [StringLength(100)]
        public string AccountNumber { get; set; }

        [StringLength(100)]
        public string IBANNumber { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }


    }
}
