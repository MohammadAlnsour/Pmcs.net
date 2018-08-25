using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Tickets;

namespace pmcs.Model.ViewModels
{
    public class TicketsViewModel
    {
        public IEnumerable<Ticket> MyTickets { get; set; }
        public IEnumerable<Ticket> AssignedToMe { get; set; }
        public IEnumerable<Ticket> OpenTickets { get; set; }
        public IEnumerable<Ticket> AllTicketsPaged { get; set; }

    }
}
