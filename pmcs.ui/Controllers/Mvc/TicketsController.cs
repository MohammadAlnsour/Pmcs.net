using pmcs.Model.ViewModels;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pmcs.ui.Controllers.Mvc
{
    public class TicketsController : SecuredBaseController
    {
        private readonly ITicketsService ticketsService;
        public TicketsController(ITicketsService ticketsService)
        {
            this.ticketsService = ticketsService;
        }

        // GET: Tickets
        public ActionResult Management()
        {
            ViewData["TicketManagement"] = "active";
            var viewModel = new TicketsViewModel()
            {
                MyTickets = ticketsService.GetMyTickets(User.UserId),
                AssignedToMe = ticketsService.GetAssignedTickets(User.UserId),
                OpenTickets = ticketsService.GetOpenTickets(),
                AllTicketsPaged = User.IsAdministrator?  ticketsService.GetAllTickets() : ticketsService.GetAssignedTickets(User.UserId)
            };
            return View(viewModel);
        }
        //public ActionResult AssignedToMe()
        //{
        //    ViewData["TicketManagement"] = "active";
        //    var assignedtoMe = ticketsService.GetAssignedTickets(User.UserId);
        //    return View(assignedtoMe);
        //}
        //public ActionResult OpenTickets()
        //{
        //    ViewData["TicketManagement"] = "active";
        //    return View();
        //}
        //public ActionResult AllTickets()
        //{
        //    ViewData["TicketManagement"] = "active";
        //    return View();
        //}


    }
}