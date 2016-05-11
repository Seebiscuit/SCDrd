define(['app', 'marionette', 'templates', 'models/Post', 'moment', 'quill'],
    function (app, Marionette, templates, Post, moment, Quill) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.blog.newPost,

            className: 'entry clearfix',

            id: 'new-post',

            regions: {
                imageUploadForm: '.image-upload'
            },

            ui: {
                title: '#post-title',
                tags: '#post-tags',
                editor: '#newpost-ql-editor',
                editorToolbar: '#newpost-ql-full-toolbar',
                addImage: '.ql-image',
                imageTooltip: '.ql-image-tooltip',
                cancel: '.add-post-cancel',
                accept: '.accept-post',
                inputs: 'input'
            },

            events: {
                'click @ui.accept': 'addPost',
                'click @ui.cancel': 'cancelPost',
                'click @ui.addImage': 'addImage',
                'input @ui.tags': 'processTags'
            },

            viewOptions: ['tags'],

            initialize: function (options) {
                this.mergeOptions(options, this.viewOptions);
                this.model = new Post;
                this.model.on('invalid', _.bind(this.notifyInvalid, this));
            },

            onAttach: function newPostOnAttach() {
                this.quill = new Quill(this.ui.editor.get(0), {
                    modules: {
                        'toolbar': { container: this.ui.editorToolbar.get(0) },
                        'link-tooltip': true
                    },
                    theme: 'snow'
                });
                this.quill.on(this.quill.constructor.events.SELECTION_CHANGE, _.bind(this.setEditorSelection, this));
                // Refresh the ui
                this._bindUIElements();

                this.el.scrollIntoView();
            },

            processTags: function (e) {
                var dbTag;
                var tags = this.ui.tags.val().split(',');
                if (tags.length) {
                    this.postTags = _.map(tags, function (tag) {
                        dbTag = (this.tags.find({ category: tag }) || {});
                        return {
                            id: dbTag.id || 0,
                            category: dbTag.category
                        };
                    }.bind(this))
                }
            },

            addImage: function newPostAddImage(e) {
                var region = this.getRegion('imageUploadForm');
                var cursorPos = (this.range || {}).start || 0;
                require(['lib/upload-file/UploadFile'], _.bind(function newPostUploadFile(UploadFile) {
                    region.view = new UploadFile({ quill: this.quill, cursorPos: cursorPos });
                    region.show(region.view);
                }, this));
            },

            setEditorSelection: function (range) {
                if (!((range != null) && range.isCollapsed())) {
                    return;
                }
                this.range = range;
                console.log("NewPost | Range:", this.range);
            },

            addPost: function () {
                var tags = this.ui.tags.val().split(',');
                if (tags.length) {
                    tags = _.map(tags, function (tag) {
                        return { category: tag };
                    })
                }
                this.model.save({
                    title: this.ui.title.val(),
                    post1: this.quill.getHTML(),
                    Tags: tags
                },
                {
                    success: _.bind(this.destroy, this)
                });
            },

            notifyInvalid: function (model, errors) {
                this.ui.inputs.css('border-color', ''); // Reset styling
                var errorName
                _.all(errors, _.bind(function (error, key) {
                    errorName = key.toLowerCase();
                    this.ui[errorName].css('border-color', 'red') // Notify
                    return error;
                }, this))
            },

            cancelPost: function () {
                this.destroy();
            },

            templateHelpers: function () {
                var dateVar = new Date(Date.now());
                console.log(dateVar)
                return {
                    day: dateVar.getDate(),
                    month: moment(dateVar).format('MMM')
                }
            },
        });
    });