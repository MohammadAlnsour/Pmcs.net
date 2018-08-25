using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model.DTOs
{
    public class FullCalendarEventsGroup
    {
        public List<FullCalendarTaskEvent> events { get; set; }
        public string color { get; set; }
        public string textColor { get; set; }


    }
}
