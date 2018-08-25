using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model;
using pmcs.Models;
using pmcs.Model.Contracts;


namespace pmcs.Services.Interfaces
{
    public interface ISitesService
    {
        int CreateSite(Site site);
        void UpdateSite(Site site);
        IEnumerable<Site> GetSites();
        Site GetSite(int siteId);

        SiteAntennaDetails GetSiteAttennaDetails(int siteId);
        SitesConfiguration GetSiteConfiguration(int siteId);
        IEnumerable<SitesContact> GetSiteContacts(int siteId);
        IEnumerable<SitesFileAttachment> GetSiteFilesAttachments(int siteId);
        SitesOperation GetSiteOperation(int siteId);

    }
}
