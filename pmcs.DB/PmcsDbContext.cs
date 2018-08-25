namespace pmcs.DB
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class PmcsDbContext : DbContext
    {
        public PmcsDbContext()
            : base("name=PmcsConnectionString")
        {
        }

        public virtual DbSet<InventoriesCategory> InventoriesCategories { get; set; }
        public virtual DbSet<Manufacturer> Manufacturers { get; set; }
        public virtual DbSet<SiteInventory> SiteInventories { get; set; }
        public virtual DbSet<SiteInventoryItem> SiteInventoryItems { get; set; }
        public virtual DbSet<Budget> Budgets { get; set; }
        public virtual DbSet<ChangeApprovalWorkflow> ChangeApprovalWorkflows { get; set; }
        public virtual DbSet<ChangeRequest> ChangeRequests { get; set; }
        public virtual DbSet<ChangeType> ChangeTypes { get; set; }
        public virtual DbSet<ChangeWorkflowStage> ChangeWorkflowStages { get; set; }
        public virtual DbSet<DocumentManagementWorkflowStage> DocumentManagementWorkflowStages { get; set; }
        public virtual DbSet<EmailServerSetting> EmailServerSettings { get; set; }
        public virtual DbSet<EmailsTemplate> EmailsTemplates { get; set; }
        public virtual DbSet<InvoiceWorkflowStage> InvoiceWorkflowStages { get; set; }
        public virtual DbSet<NotifiactionsType> NotifiactionsTypes { get; set; }
        public virtual DbSet<SitesOwner> SitesOwners { get; set; }
        public virtual DbSet<SystemView> SystemViews { get; set; }
        public virtual DbSet<WorkflowStage> WorkflowStages { get; set; }
        public virtual DbSet<AsBuilt> AsBuilts { get; set; }
        public virtual DbSet<BOQsBudget> BOQsBudgets { get; set; }
        public virtual DbSet<Contractor> Contractors { get; set; }
        public virtual DbSet<CULGroup> CULGroups { get; set; }
        public virtual DbSet<CULGroupCUL> CULGroupCULs { get; set; }
        public virtual DbSet<CUL> CULs { get; set; }
        public virtual DbSet<DesignBOQ> DesignBOQs { get; set; }
        public virtual DbSet<DismantleRequest> DismantleRequests { get; set; }
        public virtual DbSet<Element> Elements { get; set; }
        public virtual DbSet<ElementsDiscount> ElementsDiscounts { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoicesApprovalWorkflow> InvoicesApprovalWorkflows { get; set; }
        public virtual DbSet<Job> Jobs { get; set; }
        public virtual DbSet<JobsExpens> JobsExpenses { get; set; }
        public virtual DbSet<JobsOIL> JobsOILs { get; set; }
        public virtual DbSet<LeaseContract> LeaseContracts { get; set; }
        public virtual DbSet<LeasePaymentTransactionApprovalWorkflow> LeasePaymentTransactionApprovalWorkflows { get; set; }
        public virtual DbSet<LeasePaymentTransaction> LeasePaymentTransactions { get; set; }
        public virtual DbSet<PAT> PATs { get; set; }
        public virtual DbSet<POs> POs { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<SitesAntennaDetail> SitesAntennaDetails { get; set; }
        public virtual DbSet<SitesConfiguration> SitesConfigurations { get; set; }
        public virtual DbSet<SitesContact> SitesContacts { get; set; }
        public virtual DbSet<SitesFileAttachment> SitesFileAttachments { get; set; }
        public virtual DbSet<SitesOperation> SitesOperations { get; set; }
        public virtual DbSet<SitesOwnersPaymentsAccount> SitesOwnersPaymentsAccounts { get; set; }
        public virtual DbSet<DocumentReply> DocumentReplies { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<ErrorLog> ErrorLogs { get; set; }
        public virtual DbSet<EventLog> EventLogs { get; set; }
        public virtual DbSet<ActivityStatu> ActivityStatus { get; set; }
        public virtual DbSet<ActivityType> ActivityTypes { get; set; }
        public virtual DbSet<AzimuthType> AzimuthTypes { get; set; }
        public virtual DbSet<BOQModelType> BOQModelTypes { get; set; }
        public virtual DbSet<CapitalizationMilestone> CapitalizationMilestones { get; set; }
        public virtual DbSet<Currency> Currencies { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<ElementsType> ElementsTypes { get; set; }
        public virtual DbSet<ExpensesType> ExpensesTypes { get; set; }
        public virtual DbSet<FinancialInvoiceType> FinancialInvoiceTypes { get; set; }
        public virtual DbSet<Governorate> Governorates { get; set; }
        public virtual DbSet<InvoicesClassificationType> InvoicesClassificationTypes { get; set; }
        public virtual DbSet<JobsType> JobsTypes { get; set; }
        public virtual DbSet<OperationsCenter> OperationsCenters { get; set; }
        public virtual DbSet<PATStatusType> PATStatusTypes { get; set; }
        public virtual DbSet<PATSupervisor> PATSupervisors { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
        public virtual DbSet<PaymentsMilestoneType> PaymentsMilestoneTypes { get; set; }
        public virtual DbSet<POClassification> POClassifications { get; set; }
        public virtual DbSet<POPayableType> POPayableTypes { get; set; }
        public virtual DbSet<POsClassification> POsClassifications { get; set; }
        public virtual DbSet<POsPayableType> POsPayableTypes { get; set; }
        public virtual DbSet<POType> POTypes { get; set; }
        public virtual DbSet<PowerType> PowerTypes { get; set; }
        public virtual DbSet<ShelterType> ShelterTypes { get; set; }
        public virtual DbSet<SiteAccessibility> SiteAccessibilities { get; set; }
        public virtual DbSet<SitesAreasName> SitesAreasNames { get; set; }
        public virtual DbSet<SitesLeaser> SitesLeasers { get; set; }
        public virtual DbSet<SitesModelsType> SitesModelsTypes { get; set; }
        public virtual DbSet<SitesStructuresType> SitesStructuresTypes { get; set; }
        public virtual DbSet<SitesType> SitesTypes { get; set; }
        public virtual DbSet<StructuresType> StructuresTypes { get; set; }
        public virtual DbSet<TicketsModule> TicketsModules { get; set; }
        public virtual DbSet<Vendor> Vendors { get; set; }
        public virtual DbSet<WorkflowAction> WorkflowActions { get; set; }
        public virtual DbSet<WorkflowRejectionReason> WorkflowRejectionReasons { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectTemplate> ProjectTemplates { get; set; }
        public virtual DbSet<ProjectTemplateTask> ProjectTemplateTasks { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RolesModulesMapping> RolesModulesMappings { get; set; }
        public virtual DbSet<SystemModule> SystemModules { get; set; }
        public virtual DbSet<UsersAccount> UsersAccounts { get; set; }
        public virtual DbSet<UsersNotification> UsersNotifications { get; set; }
        public virtual DbSet<UsersRole> UsersRoles { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<TicketsDiscussion> TicketsDiscussions { get; set; }
        public virtual DbSet<TicketsHistory> TicketsHistories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventoriesCategory>()
                .HasMany(e => e.SiteInventoryItems)
                .WithOptional(e => e.InventoriesCategory)
                .HasForeignKey(e => e.InventoryCategoryId);

            modelBuilder.Entity<SiteInventory>()
                .HasMany(e => e.SiteInventoryItems)
                .WithRequired(e => e.SiteInventory)
                .HasForeignKey(e => e.SiteInventoryId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SiteInventoryItem>()
                .HasMany(e => e.SiteInventoryItems1)
                .WithOptional(e => e.SiteInventoryItem1)
                .HasForeignKey(e => e.ParentItemId);

            modelBuilder.Entity<Budget>()
                .HasMany(e => e.ChangeRequests)
                .WithRequired(e => e.Budget)
                .HasForeignKey(e => e.CurrentBudgetCodeId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Budget>()
                .HasMany(e => e.ChangeRequests1)
                .WithRequired(e => e.Budget1)
                .HasForeignKey(e => e.ProposedBudgetCodeId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ChangeRequest>()
                .HasMany(e => e.ChangeApprovalWorkflows)
                .WithRequired(e => e.ChangeRequest)
                .HasForeignKey(e => e.ChangeRequestId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ChangeType>()
                .HasMany(e => e.ChangeRequests)
                .WithRequired(e => e.ChangeType1)
                .HasForeignKey(e => e.ChangeType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ChangeWorkflowStage>()
                .HasMany(e => e.ChangeApprovalWorkflows)
                .WithRequired(e => e.ChangeWorkflowStage)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NotifiactionsType>()
                .HasMany(e => e.EmailsTemplates)
                .WithRequired(e => e.NotifiactionsType)
                .HasForeignKey(e => e.NotificationTypeId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitesOwner>()
                .HasMany(e => e.LeaseContracts)
                .WithRequired(e => e.SitesOwner)
                .HasForeignKey(e => e.SiteOwnerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitesOwner>()
                .HasMany(e => e.Sites)
                .WithRequired(e => e.SitesOwner)
                .HasForeignKey(e => e.SiteOwnerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitesOwner>()
                .HasMany(e => e.SitesOwnersPaymentsAccounts)
                .WithRequired(e => e.SitesOwner)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkflowStage>()
                .HasMany(e => e.InvoicesApprovalWorkflows)
                .WithRequired(e => e.WorkflowStage)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Contractor>()
                .HasMany(e => e.ChangeRequests)
                .WithRequired(e => e.Contractor)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Contractor>()
                .HasMany(e => e.POs)
                .WithRequired(e => e.Contractor)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CULGroup>()
                .HasMany(e => e.CULGroupCULs)
                .WithRequired(e => e.CULGroup)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CULGroup>()
                .HasMany(e => e.POs)
                .WithRequired(e => e.CULGroup)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CUL>()
                .HasMany(e => e.AsBuilts)
                .WithRequired(e => e.CUL)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CUL>()
                .HasMany(e => e.CULGroupCULs)
                .WithRequired(e => e.CUL)
                .HasForeignKey(e => e.CULItemId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CUL>()
                .HasMany(e => e.DesignBOQs)
                .WithRequired(e => e.CUL)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Element>()
                .HasMany(e => e.BOQsBudgets)
                .WithRequired(e => e.Element)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Element>()
                .HasMany(e => e.Jobs)
                .WithRequired(e => e.Element)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Invoice>()
                .HasMany(e => e.InvoicesApprovalWorkflows)
                .WithRequired(e => e.Invoice)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Job>()
                .HasMany(e => e.AsBuilts)
                .WithRequired(e => e.Job)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Job>()
                .HasMany(e => e.DesignBOQs)
                .WithRequired(e => e.Job)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Job>()
                .HasMany(e => e.JobsOILs)
                .WithRequired(e => e.Job)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Job>()
                .HasMany(e => e.JobsExpenses)
                .WithRequired(e => e.Job)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Job>()
                .HasMany(e => e.PATs)
                .WithRequired(e => e.Job)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<JobsExpens>()
                .Property(e => e.Amount)
                .HasPrecision(10, 8);

            modelBuilder.Entity<LeaseContract>()
                .Property(e => e.AmountPerPayment)
                .HasPrecision(15, 10);

            modelBuilder.Entity<LeaseContract>()
                .Property(e => e.TotalLeaseAmount)
                .HasPrecision(20, 10);

            modelBuilder.Entity<LeaseContract>()
                .Property(e => e.POValue)
                .HasPrecision(20, 10);

            modelBuilder.Entity<LeaseContract>()
                .Property(e => e.Balance)
                .HasPrecision(20, 10);

            modelBuilder.Entity<LeaseContract>()
                .HasMany(e => e.LeasePaymentTransactionApprovalWorkflows)
                .WithRequired(e => e.LeaseContract)
                .HasForeignKey(e => e.LeaseId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LeaseContract>()
                .HasMany(e => e.LeasePaymentTransactions)
                .WithRequired(e => e.LeaseContract)
                .HasForeignKey(e => e.LeaseId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<POs>()
                .Property(e => e.PoGross)
                .HasPrecision(20, 4);

            modelBuilder.Entity<POs>()
                .Property(e => e.PoNet)
                .HasPrecision(20, 4);

            modelBuilder.Entity<POs>()
                .Property(e => e.FOCGross)
                .HasPrecision(20, 4);

            modelBuilder.Entity<POs>()
                .Property(e => e.PoUSDRate)
                .HasPrecision(20, 4);

            modelBuilder.Entity<POs>()
                .HasMany(e => e.ElementsDiscounts)
                .WithRequired(e => e.POs)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<POs>()
                .HasMany(e => e.Invoices)
                .WithRequired(e => e.POs)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<POs>()
                .HasMany(e => e.Jobs)
                .WithRequired(e => e.POs)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<POs>()
                .HasMany(e => e.JobsExpenses)
                .WithRequired(e => e.POs)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Site>()
                .HasMany(e => e.DismantleRequests)
                .WithRequired(e => e.Site)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Site>()
                .HasMany(e => e.SitesConfigurations)
                .WithRequired(e => e.Site)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Document>()
                .HasMany(e => e.DocumentReplies)
                .WithRequired(e => e.Document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<District>()
                .HasMany(e => e.ChangeRequests)
                .WithRequired(e => e.District)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ExpensesType>()
                .HasMany(e => e.JobsExpenses)
                .WithRequired(e => e.ExpensesType)
                .HasForeignKey(e => e.ExpenseTypeId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Governorate>()
                .HasMany(e => e.Sites)
                .WithOptional(e => e.Governorate)
                .HasForeignKey(e => e.GevernorateId);

            modelBuilder.Entity<InvoicesClassificationType>()
                .HasMany(e => e.Invoices)
                .WithOptional(e => e.InvoicesClassificationType)
                .HasForeignKey(e => e.InvoiceClassificationId);

            modelBuilder.Entity<JobsType>()
                .HasMany(e => e.Jobs)
                .WithRequired(e => e.JobsType)
                .HasForeignKey(e => e.JobType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PATStatusType>()
                .HasMany(e => e.PATs)
                .WithRequired(e => e.PATStatusType)
                .HasForeignKey(e => e.PATStatusId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PaymentMethod>()
                .HasMany(e => e.SitesOwnersPaymentsAccounts)
                .WithRequired(e => e.PaymentMethod)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<POClassification>()
                .HasMany(e => e.POs)
                .WithRequired(e => e.POClassification)
                .HasForeignKey(e => e.POClassificationId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<POsPayableType>()
                .HasMany(e => e.POs)
                .WithOptional(e => e.POsPayableType)
                .HasForeignKey(e => e.POPayableTypeId);

            modelBuilder.Entity<ShelterType>()
                .HasMany(e => e.SitesConfigurations)
                .WithOptional(e => e.ShelterType)
                .HasForeignKey(e => e.ShelterTypeId);

            modelBuilder.Entity<SitesType>()
                .HasMany(e => e.Sites)
                .WithRequired(e => e.SitesType)
                .HasForeignKey(e => e.SiteType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<StructuresType>()
                .HasMany(e => e.SitesConfigurations)
                .WithOptional(e => e.StructuresType)
                .HasForeignKey(e => e.StructureTypeId);

            modelBuilder.Entity<Vendor>()
                .HasMany(e => e.SitesConfigurations)
                .WithRequired(e => e.Vendor)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkflowRejectionReason>()
                .HasMany(e => e.InvoicesApprovalWorkflows)
                .WithOptional(e => e.WorkflowRejectionReason)
                .HasForeignKey(e => e.RejectionReasonId);

            modelBuilder.Entity<WorkflowRejectionReason>()
                .HasMany(e => e.LeasePaymentTransactionApprovalWorkflows)
                .WithOptional(e => e.WorkflowRejectionReason)
                .HasForeignKey(e => e.RejectionReasonId);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.ChangeRequests)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.POs)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.Tasks)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProjectTemplate>()
                .HasMany(e => e.ProjectTemplateTasks)
                .WithRequired(e => e.ProjectTemplate)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProjectTemplateTask>()
                .HasMany(e => e.ProjectTemplateTasks1)
                .WithOptional(e => e.ProjectTemplateTask1)
                .HasForeignKey(e => e.ParentTaskId);

            modelBuilder.Entity<ProjectTemplateTask>()
                .HasMany(e => e.ProjectTemplateTasks11)
                .WithOptional(e => e.ProjectTemplateTask2)
                .HasForeignKey(e => e.PreviousTaskId);

            modelBuilder.Entity<Task>()
                .HasMany(e => e.Tasks1)
                .WithOptional(e => e.Task1)
                .HasForeignKey(e => e.ParentTaskId);

            modelBuilder.Entity<Role>()
                .HasMany(e => e.RolesModulesMappings)
                .WithRequired(e => e.Role)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Role>()
                .HasMany(e => e.UsersRoles)
                .WithRequired(e => e.Role)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SystemModule>()
                .HasMany(e => e.SystemViews)
                .WithRequired(e => e.SystemModule)
                .HasForeignKey(e => e.ViewModuleId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SystemModule>()
                .HasMany(e => e.RolesModulesMappings)
                .WithRequired(e => e.SystemModule)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SystemModule>()
                .HasMany(e => e.Tickets)
                .WithRequired(e => e.SystemModule)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SystemModule>()
                .HasMany(e => e.TicketsHistories)
                .WithRequired(e => e.SystemModule)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.ChangeRequests)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.RequestorId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.PATs)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.PATSupervisorId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.DocumentReplies)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.SenderId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.SenderId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.Documents1)
                .WithRequired(e => e.UsersAccount1)
                .HasForeignKey(e => e.ReceiverId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.Documents2)
                .WithOptional(e => e.UsersAccount2)
                .HasForeignKey(e => e.CopyToId1);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.Documents3)
                .WithOptional(e => e.UsersAccount3)
                .HasForeignKey(e => e.CopyToId2);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.Documents4)
                .WithOptional(e => e.UsersAccount4)
                .HasForeignKey(e => e.CopyToId3);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.Tickets)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.OwnerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.TicketsHistories)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.OwnerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.UsersNotifications)
                .WithRequired(e => e.UsersAccount)
                .HasForeignKey(e => e.ReceiverUserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.UsersNotifications1)
                .WithOptional(e => e.UsersAccount1)
                .HasForeignKey(e => e.SenderUserId);

            modelBuilder.Entity<UsersAccount>()
                .HasMany(e => e.UsersRoles)
                .WithRequired(e => e.UsersAccount)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Ticket>()
                .HasMany(e => e.TicketsDiscussions)
                .WithRequired(e => e.Ticket)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Ticket>()
                .HasMany(e => e.TicketsHistories)
                .WithRequired(e => e.Ticket)
                .WillCascadeOnDelete(false);
        }
    }
}
