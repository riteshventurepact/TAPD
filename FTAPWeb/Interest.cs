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
    
    public partial class Interest
    {
        public Interest()
        {
            this.Companies = new HashSet<Company>();
        }
    
        public int InterestId { get; set; }
        public string InterestName { get; set; }
        public string InterestDescription { get; set; }
        public string InterestPicture { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> LastUpdatedOn { get; set; }
    
        public virtual ICollection<Company> Companies { get; set; }
    }
}