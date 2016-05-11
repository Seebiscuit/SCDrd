define(['vendor/quill/dist/quill'], function quillCustom(Quill) {
    "use strict"
    Quill.prototype.insertSizedImage = function insertSizedImage(index, url, size) {
        var offset, ref, node, range;
        if (index == null) {
            this.focus();
            range = this.getSelection()
        }
        
        index = index != null ? index : range.end;    
        this.insertEmbed(index, 'image', url, 'user');
        ref = this.editor.doc.findLeafAt(index), node = ref[0], offset = ref[1];
        node = $(node.node);
        node.attr({ width: size.width, height: size.height });
        this.setSelection(index + 1, index + 1);
    };

    return Quill;
});