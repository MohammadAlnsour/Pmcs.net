using pmcs.Core;
using pmcs.Model.Tickets;
using pmcs.Models;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pmcs.ui.Controllers.API
{
    public class TicketsController : SecuredBaseAPIController
    {
        private readonly ITicketsService ticketsService;
        private readonly IAuthService authService;

        public TicketsController(ITicketsService ticketsService, IAuthService authService)
        {
            this.ticketsService = ticketsService;
            this.authService = authService;
        }

        [HttpPost]
        [Route("api/Tickets/PostTicket")]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            if (ticket == null) return BadRequest("ticket object is not present the request body");
            try
            {
                ticket.CreatedDate = DateTime.Now;
                ticket.IsActive = true;
                ticket.CreatedBy = User.UserId;
                ticket.DueDate = DateTime.Now.AddDays(8);
                ticket.StartDate = DateTime.Now;
                ticket.OwnerId = User.UserId;
                ticket.TicketNumber = "ticket-225";

                ticketsService.CreateTicket(ticket);

                var receiver = authService.GetUsersAccount(ticket.AssignedTo);
                var receivers = new List<UserAccountModel>() { receiver };
                Notifications.Notification.System<Ticket>(receivers, Notifications.Config.NotificationObjectType.TicketAction, User.UserId, "/Tickets/Management", ticket);

                var myTickets = ticketsService.GetMyTickets(User.UserId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Tickets/MyTickets.cshtml", myTickets);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/Tickets/ChangeTicketStatus")]
        public IHttpActionResult ChangeTicketStatus(Ticket ticket)
        {
            if (ticket == null) return BadRequest("ticket object is not present the request body");
            try
            {
                var originalTicket = ticketsService.GetTicket(ticket.TicketId);
                originalTicket.Status = ticket.Status;
                originalTicket.CompletedDate = DateTime.Now;

                ticketsService.ChangeTicketStatus(originalTicket);

                //var receiver = authService.GetUsersAccount(ticket.AssignedTo);
                //var receivers = new List<UserAccountModel>() { receiver };
                //Notifications.Notification.System<Ticket>(receivers, Notifications.Config.NotificationObjectType.TicketAction, User.UserId, "/Tickets/Management", ticket);

                var myTickets = ticketsService.GetAssignedTickets(User.UserId);
                var html = Helpers.RenderPartial("~/Views/Shared/Partial/Tickets/AssignedToMe.cshtml", myTickets);
                return Ok(html);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
