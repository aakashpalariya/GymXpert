using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class UserGym
    {
        public int UserId { get; set; }
        public int GymId { get; set; }
        public bool IsActive { get; set; }
        public User User { get; set; }
        public Gym Gym { get; set; }
    }
}
