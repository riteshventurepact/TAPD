using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FTAPWeb.Models
{
    public class ForgotPasswordUser
    {
        public virtual int UserId { get; set; }
        public virtual string OldPassword { get; set; }
        public virtual string NewPassword { get; set; }
        public virtual string ConfirmNewPassword { get; set; }
    }
}