using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SCDrd;
using SCDrd.Models;
using SCDrd.Models.DataHelper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace SCDrd.Controllers
{
    [Authorize(Users = "kaganasg@gmail.com")]
    public class PostsController : ApiController
    {
        private SCDrdEntities db = new SCDrdEntities();
        private UserManager<IdentityUser> _userManager;

        // GET: api/Posts
        [AllowAnonymous]
        public IQueryable<PostDTO> GetPosts()
        {
            return db.Posts.Select(post => new PostDTO
            {
                id = post.id,
                date = post.date,
                title = post.title,
                post1 = post.post1,//.Take(200).ToString() + "...", // post preview
                image = post.image,
                Tags = (from pt in db.PostTags
                        join t in db.Tags on pt.tagid equals t.id
                        where pt.postid == post.id
                        select t)
            });
        }

        // GET: api/Posts/5
        [AllowAnonymous]
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> GetPost(long id)
        {
            Post post = await db.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT: api/Posts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPost(long id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.id)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Posts
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> PostPost(PostDTO post)
        {
            Post newPost;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            newPost = new Post
            {
                title = post.title,
                post1 = post.post1,
                date = post.date,
                image = post.image
            };

            db.Posts.Add(newPost);
            await db.SaveChangesAsync();

            await TagHelper.AddOrUpdateTags(db, post.Tags.ToList());

            foreach (var tag in post.Tags)
            {
                db.PostTags.Add(new PostTag
                {
                    tagid = tag.id,
                    postid = newPost.id
                });
            }

            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = post.id }, post);
        }

        // DELETE: api/Posts/5
        [ResponseType(typeof(Post))]
        public async Task<IHttpActionResult> DeletePost(long id)
        {
            Post post = await db.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            await db.SaveChangesAsync();

            return Ok(post);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(long id)
        {
            return db.Posts.Count(e => e.id == id) > 0;
        }
    }
}