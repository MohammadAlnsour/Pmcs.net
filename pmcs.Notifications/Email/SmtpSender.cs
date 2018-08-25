using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace pmcs.Notifications.Email
{
    public class SmtpSender
    {
        private readonly MailMessageConfig _mailConfig;
        public SmtpSender(MailMessageConfig mailConfig)
        {
            _mailConfig = mailConfig;
        }

        /// <summary>
        /// sends the mail message using the MailMessageConfiguration and the SmtpConfiguration objects and returns a MailMessageStatus object that show the status the operation.
        /// </summary>
        /// <returns></returns>
        public MailMessageStatus SendMail()
        {
            if (_mailConfig == null)
                throw new NullReferenceException("MailMessageConfiguration and SmtpConfiguration objects must not be nulls");

            try
            {
                var message = new MailMessage()
                {
                    Body = _mailConfig.EmailBody,
                    BodyEncoding = Encoding.UTF8,
                    IsBodyHtml = true,
                    From = new MailAddress(_mailConfig.FromName()),
                    Sender = new MailAddress(_mailConfig.EmailUserName()),
                    Subject = _mailConfig.EmailSubject           
                };
                foreach (var to in _mailConfig.To)
                {
                    message.To.Add(new MailAddress(to));
                }

                var smtp = new SmtpClient() {
                    Credentials = new NetworkCredential(_mailConfig.EmailUserName(), _mailConfig.EmailPassword()),
                    EnableSsl = _mailConfig.EnableSSL(),
                    Host = _mailConfig.HostName(),
                    Port = _mailConfig.PortNumber()
                };

                smtp.Send(message);

                return new MailMessageStatus() { IsSuccessful = true, ResponseString = "Operation done successfully" };
            }
            catch (SmtpFailedRecipientsException ex1)
            {
                var exception = "failed reciepient : " + ex1.FailedRecipient +
                                "exception message : " + ex1.Message;
                return new MailMessageStatus() { IsSuccessful = false, ResponseString = exception, StatusCode = ex1.StatusCode };
            }
            catch (SmtpException ex2)
            {
                return new MailMessageStatus() { IsSuccessful = false, ResponseString = ex2.Message, StatusCode = ex2.StatusCode };
            }
            catch (Exception ex)
            {
                return new MailMessageStatus() { IsSuccessful = false, ResponseString = ex.Message };
            }
        }

    }
}
