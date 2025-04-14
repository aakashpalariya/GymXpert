﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class State
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public Country Country { get; set; }
    }
}
