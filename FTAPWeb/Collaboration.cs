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
    
    public partial class Collaboration
    {
        public Collaboration()
        {
            this.CollaborationImages = new HashSet<CollaborationImage>();
        }
    
        public int CollaborationId { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string Question { get; set; }
        public string InterestIds { get; set; }
        public string Description { get; set; }
        public string Partners { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> EntryBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
    
        public virtual ICollection<CollaborationImage> CollaborationImages { get; set; }
    }
}
