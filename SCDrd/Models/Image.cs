//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SCDrd.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Image
    {
        public Image()
        {
            this.Posts = new HashSet<Post>();
        }
    
        public int id { get; set; }
        public string location { get; set; }
    
        public virtual ICollection<Post> Posts { get; set; }
    }
}
