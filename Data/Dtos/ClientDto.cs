using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LashApp.Data.Dtos
{
    public class ClientDto
    {
        public ClientDto() { }
        public int ClientId { get; set; }
        public bool Active { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Phone { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public DateTime AssignDate { get; set; }
        public string Location { get; set; }
    }
    
}
