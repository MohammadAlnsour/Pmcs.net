using pmcs.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.Model
{
    public class LoginModel
    {
            [Required]
            [MaxLength(50)]
            public string UserName { get; set; }

            [Required]
            [MaxLength(50)]
            public string Password { get; set; }


    }
}
