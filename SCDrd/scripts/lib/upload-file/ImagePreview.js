define(['app', 'marionette', 'text!lib/upload-file/image-preview.html'],
    function (app, Marionette, template) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: _.template(template),

            tagName: 'figure',

            id: 'image-preview',

            className: 'center-block editing',

            ui: {
                image: 'img',
                caption: 'figcaption',
                captionInput: '.caption-input',
                sizeSlider: 'input[name="size-slider"]',
                sizePercent: '.size-percent',
                removeable: '.removeable'
            },

            events: {
                'click @ui.caption': 'enableWriteCaption',
                'change @ui.captionInput': 'writeCaption',
                'input @ui.sizeSlider': 'changeDimensions'
            },

            viewOptions: ['src'],

            initialize: function imagePreviewInitialize(options) {
                this.mergeOptions(options, this.viewOptions);
                this.on('capture', this.handleCapture);
            },

            PADDING: 30,

            onRender: function imagePreviewOnRender() {
                this.ui.image.attr('src', this.src);
                this.ui.image.on('load', _.bind(function setImageRatio() {
                    var adjustedWidth = Math.max(600, Math.min(this.ui.image.get(0).naturalWidth, 1024 - this.PADDING));
                    this.imageRatio = this.ui.image.get(0).naturalWidth / this.ui.image.get(0).naturalHeight
                    this.ui.sizeSlider.attr({ min: 30, max: 1024 });
                    this.ui.sizeSlider.val(this.ui.image.get(0).naturalWidth);
                    this.ui.captionInput.innerWidth(adjustedWidth - 5);
                    this.ui.caption.width(adjustedWidth - 5);
                    this.$el.width(adjustedWidth)
                }, this))
            },

            onAttach: function () {
                this.$el.closest('.modal-dialog').css('width', 1024);
            },

            enableWriteCaption: function enableWriteCaption(e) {
                this.$el.addClass('editing');
            },

            writeCaption: function writeCaption(e) {
                this.$el.removeClass('editing');
                this.ui.caption.text(this.ui.captionInput.val());
            },

            changeDimensions: function changeDimensions(e) {
                var adjustedWidth = Math.max(600, Math.min(this.ui.image.attr('width'), 1024 - this.PADDING));
                this.ui.image.attr('width', this.ui.sizeSlider.val() || this.ui.image.get(0).naturalHeight * this.imageRatio || this.ui.image.get(0).naturalWidth);
                this.ui.image.attr('height', this.ui.image.attr('width') / this.imageRatio || this.ui.image.get(0).naturalHeight);
                this.ui.sizePercent.text(parseInt(100 * this.ui.image.attr('width') / this.ui.image.get(0).naturalWidth) + '%');
                this.ui.captionInput.innerWidth(adjustedWidth - 5);
                this.ui.caption.width(adjustedWidth - 5);
                this.$el.width(adjustedWidth);
            },

            handleCapture: function handleCapture() {
                this.ui.removable.remove();
            },

            onPrepareImage: function () {
                this.ui.removeable.remove();
                this.ui.image.attr({ class: '', id: '' });
            }
        });
    });