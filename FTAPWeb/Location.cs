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
    
    public partial class Location
    {
        public Location()
        {
            this.Companies = new HashSet<Company>();
        }
    
        public int LocationId { get; set; }
        public string Location1 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        public virtual ICollection<Company> Companies { get; set; }
    }
}
