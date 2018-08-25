using pmcs.Model.Contracts;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Repository.EntitiesRepos;
using pmcs.Core;

namespace pmcs.Services.ContractsServices
{
    public class CULsService : ICULsService
    {
        private readonly CULsRepository cULsRepository;
        private readonly CULGroupRepository cULGroupRepository;
        private readonly CULGroupCULItemsRepository groupCULItemsRepository;

        public CULsService(CULsRepository cULsRepository,
            CULGroupRepository cULGroupRepository,
            CULGroupCULItemsRepository groupCULItemsRepository)
        {
            this.cULsRepository = cULsRepository;
            this.cULGroupRepository = cULGroupRepository;
            this.groupCULItemsRepository = groupCULItemsRepository;
        }

        public void DeleteCUL(CUL cul)
        {
            cULsRepository.Delete(cul.AutoMapObject<CUL, DB.CUL>());
        }

        public CUL GetCUL(int culId)
        {
            return cULsRepository
                .GetById(c => c.CULId == culId)
                .AutoMapObject<DB.CUL, CUL>();
        }

        public IEnumerable<CUL> SearchCULs(string criteria)
        {
            return cULsRepository
                .SearchData(c => c.Code.ToLower().Contains(criteria.ToLower())
                                               || c.Description.ToLower().Contains(criteria.ToLower()))
                .Select(c => c.AutoMapObject<DB.CUL, CUL>())
                .OrderByDescending(c => c.CULId);
        }

        public CULGroup GetCULGroup(int CULGroupId)
        {
            return cULGroupRepository
                 .GetById(g => g.CULGroupId == CULGroupId)
                 .AutoMapObject<DB.CULGroup, CULGroup>();
        }

        public IEnumerable<CULGroup> GetCULGroups()
        {
            return cULGroupRepository
                 .GetAll()
                 .Select(g => g.AutoMapObject<DB.CULGroup, CULGroup>())
                 .OrderByDescending(c => c.CULGroupId);
        }

        public IEnumerable<CUL> GetCULs()
        {
            return cULsRepository
                 .GetAll()
                 .Select(g => g.AutoMapObject<DB.CUL, CUL>())
                 .OrderByDescending(c => c.CULId);
        }

        public IEnumerable<CUL> GetCULsPaged(int pageSize, int pageNumber, ref int numberOfPages, ref int totalItemsCount)
        {
            return cULsRepository
                 .GetPaged(pageSize, pageNumber, "GetCULsPaged", ref numberOfPages, ref totalItemsCount)
                 .Select(g => g.AutoMapObject<DB.CUL, CUL>())
                 .OrderByDescending(c => c.CULId);
        }

        public IEnumerable<CUL> GetCULsByGroupId(int CULGroupId)
        {
            return cULsRepository
                 .SearchData(c => c.CULGroupId == CULGroupId)
                 .Select(g => g.AutoMapObject<DB.CUL, CUL>())
                 .OrderByDescending(c => c.CULId);
        }

        public int InsertCUL(CUL cul)
        {
            var res = cULsRepository.Insert(cul.AutoMapObject<CUL, DB.CUL>());
            return res.CULId;
        }

        public int InsertCULGroup(CULGroup cULGroup)
        {
            var res = cULGroupRepository.Insert(cULGroup.AutoMapObject<CULGroup, DB.CULGroup>());
            return res.CULGroupId;
        }

        public void UpdateCUL(CUL cul)
        {
            var original = cULsRepository.GetById(c => c.CULId == cul.CULId);
            cULsRepository.Update(original, cul.AutoMapObject<CUL, DB.CUL>());
        }

        public void UpdateCULGroup(CULGroup cULGroup)
        {
            var original = cULGroupRepository.GetById(g => g.CULGroupId == cULGroup.CULGroupId);
            cULGroupRepository.Update(original, cULGroup.AutoMapObject<CULGroup, DB.CULGroup>());
        }

        public IEnumerable<CULGroupCULs> GetGroupCULItems(int culGroupId)
        {
            return groupCULItemsRepository
                .SearchData(g => g.CULGroupId == culGroupId)
                .Select(c => c.AutoMapObject<DB.CULGroupCUL, CULGroupCULs>())
                .OrderByDescending(c => c.CULGroupId);
        }
        public int InsertCULGroupCULItem(CULGroupCULs cULGroupCUL)
        {
            var res = groupCULItemsRepository.Insert(cULGroupCUL.AutoMapObject<CULGroupCULs, DB.CULGroupCUL>());
            return res.Id;
        }
        public void DeleteCULGroupCULItem(CULGroupCULs cULGroupCUL)
        {
            groupCULItemsRepository.Delete(cULGroupCUL.AutoMapObject<CULGroupCULs, DB.CULGroupCUL>());
        }
        public void DeleteCULGroupCULItemByGroupId(int groupId)
        {
            var culGroupCULs = groupCULItemsRepository.SearchData(c => c.CULGroupId == groupId);
            foreach (var item in culGroupCULs)
            {
                groupCULItemsRepository.Delete(item);
            }
        }

    }
}
