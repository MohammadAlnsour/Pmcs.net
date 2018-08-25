using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.Interfaces
{
    public interface IElementsService
    {
        int CreateElement(Element element);
        void EditElement(Element element);
        IEnumerable<Element> GetElements();
        IEnumerable<Element> GetBoqElements(int boqId);
        IEnumerable<Element> GetPOElements(int poId);
        Element GetElement(int elementId);
        IEnumerable<Job> GetElementJobs(int elementId);


    }
}
