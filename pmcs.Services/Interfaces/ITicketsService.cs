using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Model.Tickets;

namespace pmcs.Services.Interfaces
{
    public interface ITicketsService
    {
        int CreateTicket(Ticket ticket);
        void EditTicket(Ticket ticket);
        IEnumerable<Ticket> GetAllTickets();
        IEnumerable<Ticket> GetMyTickets(int userId);
        IEnumerable<Ticket> GetAssignedTickets(int userId);
        IEnumerable<Ticket> GetOpenTickets();
        Ticket GetTicket(int ticketId);
        void ChangeTicketStatus(Ticket ticket);

    }

}
