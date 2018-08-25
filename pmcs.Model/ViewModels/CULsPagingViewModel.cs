using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class CULsPagingViewModel
    {
        public List<CUL> CULs { get; set; }
        public int NumberOfPages { get; set; }
    }
}
