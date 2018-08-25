using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using pmcs.DB;
using pmcs.Model;
using pmcs.Models;
using pmcs.Core;

namespace pmcs.ui.Tests
{
    [TestClass]
    public class AutomapTest
    {
        [TestMethod]
        public void MyCustomAutoMapTesting()
        {
            var DbWorkflowStage = new DB.WorkflowStage() {
                AllowedActionsIds = "1,2,3,4",
                CreatedBy = null,
                CreatedDate = DateTime.Now,
                IsActive = true,
                IsLockingStage = true,
                ReferenceNumberRequired = true,
                StageName = "Technical Department approve",
                StageId = 1,
                StageOrderNumber = 1,
                TrackingEntity = "1",
                TrackingOwner = "1"
            };

            var result = DbWorkflowStage.AutoMapObject<DB.WorkflowStage, Model.WorkflowStage>();
            Assert.AreEqual(DbWorkflowStage.StageName, result.StageName);
        }
    }
}
