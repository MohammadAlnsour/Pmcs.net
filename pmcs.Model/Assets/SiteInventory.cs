using pmcs.Repository.EntitiesRepos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Assets
{
    public class SiteInventory
    {
        public int InventoryId { get; set; }

        public int SiteId { get; set; }

        public string SiteName
        {
            get
            {
                var res = new SitesRepository(new DB.PmcsDbContext()).GetById(s => s.SiteId == this.SiteId);
                return res.SiteName;
            }
        }


        public DateTime? InventoryDate { get; set; }

        [StringLength(100)]
        public string InventoryDoneBy { get; set; }

        [StringLength(300)]
        public string Remarks { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

    }
}
