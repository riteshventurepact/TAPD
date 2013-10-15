using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Configuration;

namespace FTAPWeb.Controllers
{
    public static class Utility
    {
        public static string Encrypt(string ToEncrypt, bool useHasing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(ToEncrypt);

            string Key = "malkit";
            if (useHasing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(Key));
                hashmd5.Clear();
            }
            else
            {
                keyArray = UTF8Encoding.UTF8.GetBytes(Key);
            }
            TripleDESCryptoServiceProvider tDes = new TripleDESCryptoServiceProvider();
            tDes.Key = keyArray;
            tDes.Mode = CipherMode.ECB;
            tDes.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tDes.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            tDes.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }

        public static string Decrypt(string cypherString, bool useHasing)
        {
            byte[] keyArray;
            byte[] toDecryptArray = Convert.FromBase64String(cypherString.Replace(' ', '+'));

            string key = "malkit";
            if (useHasing)
            {
                MD5CryptoServiceProvider hashmd = new MD5CryptoServiceProvider();
                keyArray = hashmd.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                hashmd.Clear();
            }
            else
            {
                keyArray = UTF8Encoding.UTF8.GetBytes(key);
            }
            TripleDESCryptoServiceProvider tDes = new TripleDESCryptoServiceProvider();
            tDes.Key = keyArray;
            tDes.Mode = CipherMode.ECB;
            tDes.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tDes.CreateDecryptor();
            try
            {
                byte[] resultArray = cTransform.TransformFinalBlock(toDecryptArray, 0, toDecryptArray.Length);
                tDes.Clear();
                return UTF8Encoding.UTF8.GetString(resultArray, 0, resultArray.Length);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string SendRegisterationEmail(int userid, string email, string firstname, string lastname,string emailbody="")
        {
            try
            {
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;

                smtp.Timeout = 600000;
                smtp.Credentials = new System.Net.NetworkCredential("tapdventurepact@gmail.com", "venturepact");
                smtp.EnableSsl = true;

                MailMessage objMailParent = new MailMessage();
                objMailParent.IsBodyHtml = true;
                objMailParent.To.Add(email);
                objMailParent.From = new MailAddress("tapdventurepact@gmail.com", "TAPD");
                objMailParent.Subject = "Welcome To TAPD";

                string s = Utility.Encrypt(userid.ToString(), true);
                //string x = Decrypt(s, true);
                if (emailbody == "")
                {
                    objMailParent.Body = "Dear " + firstname + " " + lastname + ",<br/><br/>Thanks for your registration in TAPD. In order to complete your registration please verify your email by clicking on the <a href=' " + WebConfigurationManager.AppSettings["WebsiteUrl"].ToString() + "/Home/AccountConfirmation/" + s + "'  >link</a><br/><br/>Thanks<br/>TAPD Team";
                }
                else
                {
                    objMailParent.Body = emailbody;
                }
                objMailParent.Priority = MailPriority.High;
                smtp.Send(objMailParent);
                objMailParent.Dispose();
                return "sent";
            }
            catch (Exception ex)
            {
                return "error";
            }
        }

        public static string SendForgotPasswordEmail(string email)
        {
            TAPDEntities db = new TAPDEntities();
            var user = (from p in db.Users where p.EmailId == email select p).FirstOrDefault();
            if (user != null)
            {
                try
                {
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;

                    smtp.Timeout = 600000;
                    smtp.Credentials = new System.Net.NetworkCredential("tapdventurepact@gmail.com", "venturepact");
                    smtp.EnableSsl = true;

                    MailMessage objMailParent = new MailMessage();
                    objMailParent.IsBodyHtml = true;
                    objMailParent.To.Add(email);
                    objMailParent.From = new MailAddress("tapdventurepact@gmail.com", "TAPD");
                    objMailParent.Subject = "TAPD Forgot Password";

                    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    var random = new Random();
                    var result = new string(
                        Enumerable.Repeat(chars, 8)
                                  .Select(s => s[random.Next(s.Length)])
                                  .ToArray());

                    string ss = Utility.Encrypt(result, true);
                    //string x = Decrypt(s, true);

                    //Insert a new entry in ForgotPasswordUser table


                    objMailParent.Body = "Dear " + user.FirstName + " " + user.LastName + ",<br/><br/>To reset your password please click on the <a href=' " + WebConfigurationManager.AppSettings["WebsiteUrl"].ToString() + "/Home/ForgotPassword/" + ss + "'  >link</a><br/><br/>Thanks<br/>TAPD Team";
                    objMailParent.Priority = MailPriority.High;
                    smtp.Send(objMailParent);
                    objMailParent.Dispose();
                    return "sent";
                }
                catch (Exception ex)
                {
                    return "error";
                }
            }
            else
            {
                return "This email doesn't exists in TAPD user list.";
            }
        }
    }
}