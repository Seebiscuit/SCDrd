using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCDrd.Models
{
    public class PostDTO
    {
        public long id { get; set; }
        public System.DateTime date { get; set; }
        public string title { get; set; }
        public string post1 { get; set; }
        public int? image { get; set; }
        public Nullable<short> user { get; set; }

        public IEnumerable<Tag> Tags { get; set; }
    }
}