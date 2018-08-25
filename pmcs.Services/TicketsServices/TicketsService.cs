using pmcs.Model.Tickets;
using pmcs.Repository.EntitiesRepos;
using pmcs.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pmcs.Core;

namespace pmcs.Services.TicketsServices
{
    public class TicketsService : ITicketsService
    {
        private readonly TicketsRepository ticketsRepository;
        private readonly TicketsHistoryRepository ticketsHistoryRepository;

        public TicketsService(TicketsRepository ticketsRepository,
            TicketsHistoryRepository ticketsHistoryRepository)
        {
            this.ticketsRepository = ticketsRepository;
            this.ticketsHistoryRepository = ticketsHistoryRepository;
        }

        public void ChangeTicketStatus(Ticket ticket)
        {
            var originalTicket = ticketsRepository.GetById(t => t.TicketId == ticket.TicketId);
            var newTicket = ticketsRepository.GetById(t => t.TicketId == ticket.TicketId);
            newTicket.Status = ticket.Status;
            newTicket.CompletedDate = DateTime.Now;

            ticketsRepository.Update(originalTicket, newTicket);

            TicketHistory history = ticket.AutoMapObject<Ticket, TicketHistory>();
            history.TicketId = ticket.TicketId;
            //history.CreatedDate = DateTime.Now;
            history.CompletedDate = DateTime.Now;

            ticketsHistoryRepository.Insert(history.AutoMapObject<TicketHistory, DB.TicketsHistory>());

        }

        public int CreateTicket(Ticket ticket)
        {
            var res = ticketsRepository.Insert(ticket.AutoMapObject<Ticket, DB.Ticket>());
            return res.TicketId;
        }

        public void EditTicket(Ticket ticket)
        {
            var original = ticketsRepository.GetById(t => t.TicketId == ticket.TicketId);
            ticketsRepository.Update(original, ticket.AutoMapObject<Ticket, DB.Ticket>());
        }

        public IEnumerable<Ticket> GetAllTickets()
        {
            return ticketsRepository
                .GetAll()
                .Select(t => t.AutoMapObject<DB.Ticket, Ticket>())
                .OrderByDescending(c => c.TicketId);
        }

        public IEnumerable<Ticket> GetAssignedTickets(int userId)
        {
            return ticketsRepository
                .SearchData(t => t.AssignedTo == userId)
                .Select(t => t.AutoMapObject<DB.Ticket, Ticket>())
                .OrderByDescending(c => c.TicketId);
        }

        public IEnumerable<Ticket> GetMyTickets(int userId)
        {
            return ticketsRepository
                   .SearchData(t => t.OwnerId == userId)
                   .Select(t => t.AutoMapObject<DB.Ticket, Ticket>())
                   .OrderByDescending(c => c.TicketId);
        }

        public IEnumerable<Ticket> GetOpenTickets()
        {
            return ticketsRepository
                  .SearchData(t => t.Status != 2 && t.Status != 4)
                  .Select(t => t.AutoMapObject<DB.Ticket, Ticket>())
                  .OrderByDescending(c => c.TicketId);
        }

        public Ticket GetTicket(int ticketId)
        {
            return ticketsRepository
                  .GetById(t => t.TicketId == ticketId)
                  .AutoMapObject<DB.Ticket, Ticket>();
        }

    }
}
