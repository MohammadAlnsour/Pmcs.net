using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.LookupRepos;
using pmcs.Repository.EntitiesRepos;

namespace pmcs.Model.Contracts
{
    public class Site : ModelBase
    {
        public override int ModelPrimaryId => this.SiteId;

        public int SiteId { get; set; }
        public string SiteNumber { get; set; }
        public int SiteType { get; set; }
        public string SiteTypeName
        {
            get
            {
                var res = new SiteTypesRepository(new DB.PmcsDbContext()).GetById(o => o.Id == this.SiteType).Name;
                return res;
            }
        }
        public string SitePriority { get; set; }
        public string Latitude { get; set; }
        public string Longtitude { get; set; }
        public int SiteOwnerId { get; set; }
        public string SiteOwnerName
        {
            get
            {
                var res = new SiteOwnersRepository(new DB.PmcsDbContext()).GetById(o => o.OwnerId == this.SiteOwnerId).Name;
                return res;
            }
        }
        public int? GevernorateId { get; set; }
        public string GovernorateName
        {
            get
            {
                var res = new GovernoratesRepository(new DB.PmcsDbContext()).GetById(g => g.Id == this.GevernorateId).Name;
                return res;
            }
        }
        public int? DistrictId { get; set; }
        public string DistrictName
        {
            get
            {
                var res = new DistrictsRepository(new DB.PmcsDbContext()).GetById(d => d.Id == this.DistrictId).Name;
                return res;
            }
        }
        public long? BlockNumber { get; set; }
        [StringLength(10)]
        public string StreetNumber { get; set; }

        [StringLength(10)]
        public string SubStreetNumber { get; set; }

        [StringLength(10)]
        public string BuildingNumber { get; set; }

        [StringLength(50)]
        public string BuildingName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        [StringLength(150)]
        public string SiteName { get; set; }

        public int ProjectId { get; set; }

        public int? ProjectTaskId { get; set; }


    }
}
