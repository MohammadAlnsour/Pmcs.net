using pmcs.Core;
using pmcs.Model.Contracts;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Services.ContractsServices
{
    public class ElementsService : IElementsService
    {
        private readonly ElementsRepositroy elementsRepositroy;
        private readonly JobsRepository jobsRepository;

        public ElementsService(ElementsRepositroy elementsRepositroy, JobsRepository jobsRepository)
        {
            this.elementsRepositroy = elementsRepositroy;
            this.jobsRepository = jobsRepository;
        }
        public int CreateElement(Element element)
        {
            var res = elementsRepositroy.Insert(element.AutoMapObject<Element, DB.Element>());
            return res.ElementId;
        }
        public void EditElement(Element element)
        {
            var original = elementsRepositroy.GetById(e => e.ElementId == element.ElementId);
            elementsRepositroy.Update(original, element.AutoMapObject<Element, DB.Element>());
        }
        public IEnumerable<Element> GetBoqElements(int boqId)
        {
            throw new NotImplementedException();
        }
        public Element GetElement(int elementId)
        {
            var element = elementsRepositroy.GetById(e => e.ElementId == elementId);
            return element.AutoMapObject<DB.Element, Element>();
        }
        public IEnumerable<Element> GetElements()
        {
            return elementsRepositroy
                .GetAll()
                .Select(e => e.AutoMapObject<DB.Element, Element>())
                .OrderByDescending(c => c.ElementId);
        }
        public IEnumerable<Element> GetPOElements(int poId)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Job> GetElementJobs(int elementId)
        {
            return jobsRepository
                .SearchData(j => j.ElementId == elementId)
                .Select(j => j.AutoMapObject<DB.Job, Job>())
                .OrderByDescending(c => c.JobId);
        }

    }
}
