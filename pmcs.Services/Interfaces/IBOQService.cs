using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Contracts;

namespace pmcs.Services.Interfaces
{
    public interface IBOQService
    {
        int CreateBOQ(BOQ bOQ);
        void UpdateBOQ(BOQ bOQ);
        void DeleteBOQ(int BOQId);
        IEnumerable<BOQ> GetBOQs();
        IEnumerable<BOQ> GetBOQsByJobId(int jobId);
        IEnumerable<BOQ> GetBOQsByPOId(int POId);
        BOQ GetBOQ(int BOQId);
        IEnumerable<BOQ> GetBOQsByElementId(int elementId);

    }
}
