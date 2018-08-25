using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface ICULsService
    {
        CUL GetCUL(int culId);
        IEnumerable<CUL> GetCULs();
        IEnumerable<CUL> GetCULsPaged(int pageSize, int pageNumber, ref int numberOfPages, ref int totalItemsCount);
        IEnumerable<CUL> GetCULsByGroupId(int CULGroupId);
        int InsertCUL(CUL cul);
        void UpdateCUL(CUL cul);
        void DeleteCUL(CUL cul);

        CULGroup GetCULGroup(int CULGroupId);
        IEnumerable<CULGroup> GetCULGroups();
        int InsertCULGroup(CULGroup cULGroup);
        void UpdateCULGroup(CULGroup cULGroup);
        IEnumerable<CUL> SearchCULs(string criteria);

        IEnumerable<CULGroupCULs> GetGroupCULItems(int culGroupId);
        int InsertCULGroupCULItem(CULGroupCULs cULGroupCUL);
        void DeleteCULGroupCULItem(CULGroupCULs cULGroupCUL);
        void DeleteCULGroupCULItemByGroupId(int groupId);


    }
}
