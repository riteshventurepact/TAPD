﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FTAPWeb
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Objects;
    using System.Data.Objects.DataClasses;
    using System.Linq;
    
    public partial class TAPDEntities : DbContext
    {
        public TAPDEntities()
            : base("name=TAPDEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<CollaborationImage> CollaborationImages { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Opportunity> Opportunities { get; set; }
        public DbSet<OppportunityQuestion> OppportunityQuestions { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<UserRoll> UserRolls { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<sysdiagram> sysdiagrams { get; set; }
        public DbSet<CompanyMailContact> CompanyMailContacts { get; set; }
        public DbSet<UploadRequirment> UploadRequirments { get; set; }
        public DbSet<Collaboration> Collaborations { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<UserForgotPassword> UserForgotPasswords { get; set; }
    
        public virtual ObjectResult<Nullable<int>> pCreateCompanyUser(string companyName, string firstName, string lastName, string email, string phone, string password)
        {
            var companyNameParameter = companyName != null ?
                new ObjectParameter("CompanyName", companyName) :
                new ObjectParameter("CompanyName", typeof(string));
    
            var firstNameParameter = firstName != null ?
                new ObjectParameter("FirstName", firstName) :
                new ObjectParameter("FirstName", typeof(string));
    
            var lastNameParameter = lastName != null ?
                new ObjectParameter("LastName", lastName) :
                new ObjectParameter("LastName", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("Email", email) :
                new ObjectParameter("Email", typeof(string));
    
            var phoneParameter = phone != null ?
                new ObjectParameter("Phone", phone) :
                new ObjectParameter("Phone", typeof(string));
    
            var passwordParameter = password != null ?
                new ObjectParameter("Password", password) :
                new ObjectParameter("Password", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("pCreateCompanyUser", companyNameParameter, firstNameParameter, lastNameParameter, emailParameter, phoneParameter, passwordParameter);
        }
    }
}
