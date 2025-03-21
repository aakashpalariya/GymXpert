using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    [Table("UserPhotos")]
    public class UserPhoto
    {
        [Key]
        public int PhotoId { get; set; }
        public int UserId { get; set; }
        public bool IsMain { get; set; }
        public string Url { get; set; }
        public User User { get; set; }

    }
}
