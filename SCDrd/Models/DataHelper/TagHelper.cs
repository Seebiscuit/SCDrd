using SCDrd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SCDrd.Models.DataHelper
{
    static public class TagHelper
    {
        static public async Task<object> AddOrUpdateTags(SCDrdEntities db, IEnumerable<Tag> tags)
        {
            Tag dbTag;
            foreach (var tag in tags)
            {
                dbTag = db.Tags.SingleOrDefault(t => t.category == tag.category);
                if (dbTag == null)
                    db.Tags.Add(tag);
                else
                    tag.id = dbTag.id;
            }
            await db.SaveChangesAsync();

            return Task.FromResult<object>(null); // No-op
        }
    }
}