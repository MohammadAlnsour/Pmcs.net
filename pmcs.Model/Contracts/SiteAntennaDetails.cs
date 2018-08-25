using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.Contracts
{
    public class SiteAntennaDetails : ModelBase
    {
        public int AntennaPid { get; set; }
        public int? AntennaId { get; set; }

        public double? AtennaHeight { get; set; }

        [StringLength(100)]
        public string AtennaModel { get; set; }

        [StringLength(100)]
        public string AtennaAzimuth { get; set; }

        [StringLength(100)]
        public string TiltPerSectore { get; set; }

        [StringLength(100)]
        public string AntennaManufacturer { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public int SiteId { get; set; }

        public override int ModelPrimaryId => this.AntennaPid;

    }
}
