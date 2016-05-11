define(['app', 'marionette', 'text!lib/upload-file/upload-file.html', 'bootstrap'], function User(app, Mn, template) {
    "use strict"
    return Mn.LayoutView.extend({
        template: _.template(template),

        id: 'file-upload-component',

        className: 'modal fade upload',

        regions: {
            imagePreview: '#file-upload-image-preview'
        },

        ui: {
            options: 'select',
            imageInput: 'input[name="image"]',
            urlInput: 'input[name="image"]',
            uploadButton: 'button.upload'
        },

        attr: { tabindex: '-1', role: 'dialog' },

        events: {
            'show.bs.modal': 'focusInput',
            'change @ui.imageInput': 'upload',
            'change @ui.options': 'handleOption',
            'click @ui.uploadButton': 'insertImage',
            'hidden.bs.modal': 'destroy'
    },

        viewOptions: ['quill', 'cursorPos'],

        initialize: function uploadFileInitialize(options) {
            this.mergeOptions(options, this.viewOptions)
        },

        onAttach: function () {
            this.$el.modal({ backdrop: 'static' });
        },

        focusInput: function (e) {
            this.ui.imageInput.focus();
        },

        upload: function (e) {
            var file = this.ui.imageInput.get(0).files[0]
            if (file) {
                var formData = new FormData();
                formData.append('file', file);
                $.ajax({
                    url: app.getApiRoot + 'SaveFile/',
                    type: "post",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: _.bind(this.previewImage, this),
                    error: function () {
                        $("#file_upload_result").html('there was an error while submitting');
                    }
                });
            }
        },

        previewImage: function previewImage(src) {
            var region = this.getRegion('imagePreview');
            require(['lib/upload-file/ImagePreview'], function showImgePreview(ImagePreview) {
                region.view = new ImagePreview({src: src});
                region.show(region.view);
            });
            this.$el.addClass('preview');
        },

        insertImage: function () {
            var imageView = this.getRegion('imagePreview').view;
            imageView.triggerMethod('prepare:image');
            this.quill.insertSizedImage(this.cursorPos, imageView.ui.image.attr('src'), {
                width: imageView.ui.image.attr('width'),
                height: imageView.ui.image.attr('height')
            });
            this.$el.modal('hide');
            _.delay(this.destroy.bind(this), 1000); // Allow time for the modal to hide
        },

        handleOption: function (e) {
            switch (this.ui.options.val()) {
                case 'File':
                    this.$el.removeClass('upload-url');
                    break;
                case 'URL':
                    this.$el.addClass('upload-url');
                    break;
            }
        }
    });
});