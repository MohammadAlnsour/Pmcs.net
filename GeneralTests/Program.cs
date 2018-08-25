using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeneralTests
{
    class Program
    {
        static void Main(string[] args)
        {
            var tasks = new ProjectTask[]
            {
                new ProjectTask() { Project = new Project() { PorjectName = "Project x", ProjectId = 1 }, ProjectId = 1, TaskId = 1, TaskName = "1st Task in project x" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project x", ProjectId = 1 }, ProjectId = 1, TaskId = 2, TaskName = "2nd Task in project x" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project x", ProjectId = 1 }, ProjectId = 1, TaskId = 3, TaskName = "3rd Task in project x" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project x", ProjectId = 1 }, ProjectId = 1, TaskId = 4, TaskName = "4th Task in project x" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project y", ProjectId = 2 }, ProjectId = 2, TaskId = 5, TaskName = "1st Task in project y" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project y", ProjectId = 2 }, ProjectId = 2, TaskId = 6, TaskName = "2nd Task in project y" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project y", ProjectId = 2 }, ProjectId = 2, TaskId = 7, TaskName = "3rd Task in project y" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project z", ProjectId = 3 }, ProjectId = 3, TaskId = 8, TaskName = "1st Task in project z" },
                new ProjectTask() { Project = new Project() { PorjectName = "Project z", ProjectId = 3 }, ProjectId = 3, TaskId = 9, TaskName = "2nd Task in project z" },
            };


            var groups = tasks.GroupBy((t) => t.ProjectId);

            foreach (var group in groups)
            {
                Console.WriteLine(group.Key);
                foreach (var task in group)
                {
                    Console.WriteLine("\t projectId : " + task.ProjectId + ", task id : " + task.TaskId + ", Task name : " + task.TaskName);
                }
            }

            Console.ReadLine();
        }
    }

    class Project
    {
        public int ProjectId { get; set; }
        public string PorjectName { get; set; }
    }

    class ProjectTask
    {
        public int TaskId { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public string TaskName { get; set; }
    }

}
