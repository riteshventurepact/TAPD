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
    
    public partial class Opportunity
    {
        public int OpportunityId { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public string Partners { get; set; }
        public Nullable<int> JobTypeId { get; set; }
        public Nullable<int> LocationId { get; set; }
        public string InterestIds { get; set; }
        public string UploadRequirementIds { get; set; }
        public Nullable<System.DateTime> PostedOn { get; set; }
        public Nullable<System.DateTime> AvailableTill { get; set; }
    }
}
