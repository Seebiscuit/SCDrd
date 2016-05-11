define(function (require) {
    "use strict";
    return {
        nav: _.template(require('text!/templates/nav.html')),
        main: {
            mainLayout: _.template(require('text!/templates/main/main-layout.html')),
            mainHeader: _.template(require('text!/templates/main/main-header.html')),
            mainBlog: _.template(require('text!/templates/main/main-blog.html'))
        },
        login: {
            layout: _.template(require('text!/templates/login-register/login-layout.html')),
            login: _.template(require('text!/templates/login-register/login.html')),
            register: _.template(require('text!/templates/login-register/register.html'))
        },
        blog: {
            posts: _.template(require('text!/templates/blog/posts.html')),
            post: _.template(require('text!/templates/blog/post.html')),
            newPost: _.template(require('text!/templates/blog/new-post.html'))
        }
    };

});