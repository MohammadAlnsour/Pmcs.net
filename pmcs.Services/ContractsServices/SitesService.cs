using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class SitesService : ISitesService
    {
        private readonly SitesRepository sitesRepository;
        private readonly SiteAttennaRepository siteAttennaRepository;
        private readonly SiteConfigurationRepository siteConfigurationRepository;
        private readonly SitesContactRepository sitesContactRepository;
        private readonly SitesFileAttachmentRepository sitesFileAttachmentRepository;
        private readonly SitesOperationRepository sitesOperationRepository;

        public SitesService(SitesRepository sitesRepository,
            SiteAttennaRepository siteAttennaRepository,
            SiteConfigurationRepository siteConfigurationRepository,
            SitesContactRepository sitesContactRepository,
            SitesFileAttachmentRepository sitesFileAttachmentRepository,
            SitesOperationRepository sitesOperationRepository)
        {
            this.sitesRepository = sitesRepository;
            this.siteAttennaRepository = siteAttennaRepository;
            this.siteConfigurationRepository = siteConfigurationRepository;
            this.sitesContactRepository = sitesContactRepository;
            this.sitesFileAttachmentRepository = sitesFileAttachmentRepository;
            this.sitesOperationRepository = sitesOperationRepository;
        }

        public int CreateSite(Site site)
        {
            var res = sitesRepository.Insert(site.AutoMapObject<Site, DB.Site>());
            return res.SiteId;
        }

        public Site GetSite(int siteId)
        {
            var dbSite = sitesRepository.GetById(s => s.SiteId == siteId);
            return dbSite.AutoMapObject<DB.Site, Site>();
        }

        public SiteAntennaDetails GetSiteAttennaDetails(int siteId)
        {
            var atenna = siteAttennaRepository.SearchData(antenna => antenna.SiteId == siteId).SingleOrDefault();
            return atenna.AutoMapObject<DB.SitesAntennaDetail, SiteAntennaDetails>();
        }

        public SitesConfiguration GetSiteConfiguration(int siteId)
        {
            var config = siteConfigurationRepository.SearchData(conf => conf.SiteId == siteId).SingleOrDefault();
            return config.AutoMapObject<DB.SitesConfiguration, SitesConfiguration>();
        }

        public IEnumerable<SitesContact> GetSiteContacts(int siteId)
        {
            var contacts = sitesContactRepository
                .SearchData(contact => contact.SiteId == siteId)
                .Select(dbContact => dbContact.AutoMapObject<DB.SitesContact, SitesContact>())
                .OrderByDescending(c => c.ContactId);
            return contacts;
        }

        public IEnumerable<SitesFileAttachment> GetSiteFilesAttachments(int siteId)
        {
            var files = sitesFileAttachmentRepository
                .SearchData(file => file.SiteId == siteId)
                .Select(dbFile => dbFile.AutoMapObject<DB.SitesFileAttachment, SitesFileAttachment>())
                .OrderByDescending(c => c.AttachmentId);
            return files;
        }

        public SitesOperation GetSiteOperation(int siteId)
        {
            var operations = sitesOperationRepository.SearchData(op => op.SiteId == siteId).SingleOrDefault();
            return operations.AutoMapObject<DB.SitesOperation, SitesOperation>();
        }

        public IEnumerable<Site> GetSites()
        {
            return sitesRepository
                .GetAll()
                .Select(site => site.AutoMapObject<DB.Site, Site>())
                .OrderByDescending(c => c.SiteId);
        }

        public void UpdateSite(Site site)
        {
            var original = sitesRepository.GetById(s => s.SiteId == site.SiteId);
            sitesRepository.Update(original, site.AutoMapObject<Site, DB.Site>());
        }

    }
}
