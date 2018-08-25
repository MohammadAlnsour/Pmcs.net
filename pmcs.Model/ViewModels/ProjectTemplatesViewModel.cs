using pmcs.Model.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.ViewModels
{
    public class ProjectTemplatesViewModel
    {
        public Dictionary<ProjectTemplates, List<ProjectTemplateTasks>> TemplateTasksDictionary { get; set; }
    }
}
