//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class CompanyMailContact
    {
        public int ContactId { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}
