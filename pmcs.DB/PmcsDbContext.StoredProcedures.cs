using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.DB
{
    public partial class PmcsDbContext
    {
        public virtual ObjectResult<LeasePaymentTransactionApprovalWorkflow> GetUserLeasePaymentWorkflow(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<LeasePaymentTransactionApprovalWorkflow>("GetUserLeaseWorkflow @UserId", userIdParameter);
        }

        public virtual ObjectResult<LeasePaymentTransactionApprovalWorkflow> GetUnFinishedUserLeasePaymentWorkflow(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<LeasePaymentTransactionApprovalWorkflow>("GetNotFinishedUserLeaseWorkflow @UserId", userIdParameter);
        }


        public virtual ObjectResult<Task> GetProjectFinishedTasks(int projectId)
        {
            var projectIdParameter = new SqlParameter("ProjectId", projectId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<Task>("GetProjectFinishedTasks @ProjectId", projectIdParameter);
        }

        public virtual ObjectResult<Task> GetProjectOngoingTasks(int projectId)
        {
            var projectIdParameter = new SqlParameter("ProjectId", projectId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<Task>("GetProjectOngoingTasks @ProjectId", projectIdParameter);
        }

        public virtual ObjectResult<Task> GetProjectLateTasks(int projectId)
        {
            var projectIdParameter = new SqlParameter("ProjectId", projectId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<Task>("GetProjectLateTasks @ProjectId", projectIdParameter);
        }

        public virtual ObjectResult<UsersNotification> GetUserUnReadNotifications(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<UsersNotification>("GetUserUnReadNotifications @UserId", userIdParameter);
        }



        public virtual ObjectResult<InvoicesApprovalWorkflow> GetUserInvoicesWorkflow(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<InvoicesApprovalWorkflow>("GetUserInvoicesWorkflow @UserId", userIdParameter);
        }

        public virtual ObjectResult<InvoicesApprovalWorkflow> GetUnFinishedUserInvoicesWorkflow(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<InvoicesApprovalWorkflow>("GetNotFinishedUserInvoicesWorkflow @UserId", userIdParameter);
        }


        public virtual ObjectResult<ChangeApprovalWorkflow> GetUserChangeRequestsWorkflow(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<ChangeApprovalWorkflow>("GetUserChangeRequestsWorkflow @UserId", userIdParameter);
        }

        public virtual ObjectResult<ChangeApprovalWorkflow> GetUnFinishedUserChangeRequestsWorkflow(int userId)
        {
            var userIdParameter = new SqlParameter("UserId", userId);
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<ChangeApprovalWorkflow>("GetNotFinishedUserChangeRequestsWorkflow @UserId", userIdParameter);
        }

        public virtual ObjectResult<CUL> GetCULsPaged(int pageSize, int pageNumber)
        {
            var pageSizeParameter = new SqlParameter("PageSize", pageSize);
            var pageNumberParameter = new SqlParameter("PageNumber", pageNumber);

            return ((IObjectContextAdapter)this)
                .ObjectContext
                .ExecuteStoreQuery<CUL>("GetCULsPaged @PageSize @PageNumber", pageSizeParameter, pageNumberParameter);
        }

        public virtual ObjectResult GetObjectPaged<T>(int pageSize, int pageNumber, string spName)
        {
            var pageSizeParameter = new SqlParameter("PageSize", pageSize);
            var pageNumberParameter = new SqlParameter("PageNumber", pageNumber);

            //var cmdText = spName + " @PageSize = @PageSize, @PageNumber = @PageNumber";

            var res = ((IObjectContextAdapter)this)
                   .ObjectContext
                   .ExecuteStoreQuery<T>(spName + " @PageSize, @PageNumber", pageSizeParameter, pageNumberParameter);

            //var resList = res as List<T>;

            return res;
        }

    }
}
